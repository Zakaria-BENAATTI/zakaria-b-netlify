	// Déclaratio nd'un flag qui contiendra si oui ou non on est en mode mobile
	var isOkForParallaxe = true, isOkForParallaxeMobile = true;

	// Déclaration de tous les previous pour chaque div parallaxe
	var previousScroll = 0, pSAbout = 0, pSSkill = 0, pSEducation = 0, pSCulture = 0; // à déclarer en dehors du ready de jquery, sinon la fonction ne trouve pas les variables

	var positionY = 0; // Position Y d'un élément

	var buttonClicked = false; // flag qui passe a true des qu'on a cliqué sur un bouton du menu. Permet d'identifier si on va selectionner ou non les onglets du menu (pour eviter de voir le defilement des colorations de boutons)
	var btnBgTimer = null; // Timer qui contient temporaireement l'action de selectionner le bouton apres 1500ms

	/** Chargement du JS ONLOAD */
	(function () {
		// OnLoad
		// Fait disparaitre les div erreur et notif si elle sont visible
		if ($('#notif-div').is(':visible')) {
			setTimeout("$('#notif-div').fadeOut();", 7000);
			$('#notif-div').click(function(){
				$(this).fadeOut();
			});
		}
		if ($('#erreur-div').is(':visible')) {
			setTimeout("$('#erreur-div').fadeOut();", 7000);
			$('#erreur-div').click(function(){
				$(this).fadeOut();
			});
		}
					

		// Charge le module carousel slick pour la section bestof
		$('.carousel').slick({
			dots: true,
			infinite: true,
			speed: 500,
			/*autoplay: true,*/
			autoplaySpeed: 5000,
			cssEase: 'linear',
			lazyLoad: 'ondemand',
			mobileFirst: true,
			fade: true, // necessaire car en slide normal si on revient à la premiere, elle s'affiche sans le css au debut
			/*arrows: true,*/
			prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
			adaptiveHeight: true, // Important sinon les diapo elargissent le slider
			useCSS: true,
			edgeFriction: 0.15,
			swipe: true,
			pauseOnHover: true,
		});

		onresizeEvents();
		//onmousemoveEvents();
		
		isOkForParallaxe = detectDevice();
		isOkForParallaxeMobile = detectDevice('mobile');
		lockMenuBar(); // Bloque ou pas la barre du menu
	    hideWithScroll('title', 0, 400); // effet de disparition/apparition du text header
	    activeSelectedMenu(); 

	    moveInfo('section-info.info-1');
	    moveInfo('section-info.info-2', 'left');
	    moveInfo('section-info.info-3');
	    moveInfo('section-info.info-4', 'left');
	    technoAppear(); // Charge les bulle de techno
	    movePicture(); // Fait apparaitre la photo de la gauche
		fadeSkillBloc(); // Fait apparaitre en fadein les 6 bloc de competences
		moveEducationBloc(); // Fait apparaitre les bloc education de gauche à droite en ease
		
		// Evenement onclick sur les bloc de skill si on est au format mobile
		$('.skill-bloc').click(function(){
			if ($(window).width() <= 900) {
				if ($(this).children('p').css('display') == 'none') {
					$('.skill-bloc p').stop().slideUp();
					$(this).children('p').stop().slideDown();
				} else {
					$(this).children('p').stop().slideUp();
				}
			}
		});
		socialAppear();
		$('.bubble').addClass('hidden'); // Cache les bulles par defaut
		cultureAppear(false, $(window).width()); // Fait pop les bulles de culture
		if ($(window).width() > 800) {
			parallaxeVideo('section-culture', pSCulture, $(this).scrollTop(), 2);
		}

		// Déclaration des évenements
	    onscrollEvents();
	    hideMenuBarOnclick(); // Cache la barre de menu mobile lorsqu'on click n'importe ou dans la fenêtre
	    onmouseleaveBubble(); // evenement si on sort des bulles de culture

		// Particle js de la div culture
		particlesJS(
			"particles-js", 
			{
				"particles":{
					"number":{
						"value":34,
						"density":{
							"enable":true,
							"value_area":800
						}
					},
					"color":{
						"value":"#cf6318"
					},
					"shape":{
						"type":"circle",
						"stroke":{
							"width":0,
							"color":"#000000"
						},
						"polygon":{
							"nb_sides":7
						},
						"image":{
							"src":"img/github.svg",
							"width":100,
							"height":100
						}
					},
					"opacity":{
						"value":0.5,
						"random":false,
						"anim":{
							"enable":true,
							"speed":0.2,
							"opacity_min":0.1,
							"sync":false
						}
					},
					"size":{
						"value":116.2473744127504,
						"random":true,
						"anim":{
							"enable":false,
							"speed":40,
							"size_min":0.1,
							"sync":false
						}
					},
					"line_linked":{
						"enable":false,
						"distance":150,
						"color":"#ffffff",
						"opacity":0.4,
						"width":1
					},
					"move":{
						"enable":true,
						"speed":1,
						"direction":"none",
						"random":false,
						"straight":false,
						"out_mode":"bounce",
						"bounce":false,
						"attract":{
							"enable":false,
							"rotateX":1924.0944730386273,
							"rotateY":2324.947488255008
						}
					}
				},
				"interactivity":{
					"detect_on":"window",
					"events":{
						"onhover":{
							"enable":false,
							"mode":"repulse"
						},
						"onclick":{
							"enable":true,
							"mode":"repulse"
						},
						"resize":true
					},
					"modes":{
						"grab":{
							"distance":400,
							"line_linked":{
								"opacity":1
							}
						},
						"bubble":{
							"distance":400,
							"size":40,
							"duration":2,
							"opacity":8,
							"speed":3
						},
						"repulse":{
							"distance":200,
							"duration":0.4
						},
						"push":{
							"particles_nb":4
						},
						"remove":{
							"particles_nb":2
						}
					}
				},
				"retina_detect":true
			}
		);
	}());

	// Fonction contenant tous les evenements onscroll
	function onscrollEvents() {
		$(window).scroll(function(){
	    	// Déclaration des varibles
			var currentScroll = $(this).scrollTop();

			// Blocage du menu si on ne voit plus l'image header
			lockMenuBar();
	    	activeSelectedMenu(); 

	    	// Affichage lazyload des sections
	    	hideWithScroll('title', 0, 400); // effet de disparition/apparition du text header
	    	//lload('section-general', 'fade', 'slow'); // effet d'apparition d'un contenu complet, dès que la div parent est visible à l'écran
	    	
	    	// Affiche les éléments de la section A propos si elle est visible
	    	showWithScroll('section-about', elementPositionY($('.section-about')), 400, 3);
	    	showWithScroll('section-appear-techno', elementPositionY($('.section-techno')), 200, 3);
	    	showWithScroll('section-appear-skill', elementPositionY($('.section-skill')), 300, 3);
	    	showWithScroll('section-appear-education', elementPositionY($('.section-education')), 400, 1);


	    	// Affiche les bulles de technos
	    	technoAppear();
		    moveInfo('section-info.info-1');
		    moveInfo('section-info.info-2', 'left');
		    moveInfo('section-info.info-3');
		    moveInfo('section-info.info-4', 'left');
		    //moveInfo('section-info.info-5');
		    skillAppear();
	    	movePicture();// Fait apparaitre la photo de la gauche
			fadeSkillBloc(); // Fait apparaitre en fadein les 6 bloc de competences
			moveEducationBloc(); // Fait apparaitre les bloc education de gauche à droite en ease
			socialAppear(); // Fait apparaitre les boutons reseaux sociaux du footer
			cultureAppear(false, $(window).width()); // Fait pop les bulles de culture
			if ($(window).width() > 800) {
		    	parallaxeVideo('section-culture', pSCulture, currentScroll, 2);
		    }

			// Effets parallaxe
			// Header
			if (isVisible('.parallaxe-container-header') && $(window).width() > 800) {
				// Bouge le mobile vers la droite pour le sortir de l'ecran avec un transform rotate
				moveHeaderItems('parallaxe-container-header');

		    	parallaxeScroll(previousScroll, currentScroll, 'parallaxe-container-header', 4);
		    	// Assigne le scroll actuel au previous scroll
				previousScroll = currentScroll;

			// Skill
		    } else if (isVisible('.parallaxe-container-skill')) {
		    	if (isOkForParallaxe && $(window).width() > 800) {
			    	parallaxeScroll(pSSkill, currentScroll, 'parallaxe-container-skill', 2);
					pSSkill = currentScroll;
		    	} else {
	        		$('.parallaxe-container-skill').css('background-position', '50% 0px');
		    	}
		    }
		    if (isVisible('.parallaxe-container-education')) {
		    	if (isOkForParallaxeMobile && $(window).width() > 800) {
			    	parallaxeScroll(pSEducation, currentScroll, 'parallaxe-container-education', 4);
					pSEducation = currentScroll;
		    	} else {
	        		$('.parallaxe-container-education').css('background-position', '50% 0px');
		    	}
		    }
	    });
	}

	function onresizeEvents() {
		$(window).resize(function(){
			isOkForParallaxe = detectDevice();
			isOkForParallaxeMobile = detectDevice('mobile');
	    	technoAppear(); // Charge les bulle de techno
	    	movePicture();// Fait apparaitre la photo de la gauche
			fadeSkillBloc(); // Fait apparaitre en fadein les 6 bloc de competences
			cultureAppear(true, $(window).width()); // Fait pop les bulles de culture
		    parallaxeVideo('section-culture', pSCulture, $(this).scrollTop(), 2);

			// Re-affichage des paragraphes contenu dans les skills (au cas ou on aurai fadeOut en mode mobile)
			if ($(window).width() > 900) {
				$('.skill-bloc p').show();
			} else {
				$('.skill-bloc p').hide();
			}
		});
	}

	function onmousemoveEvents() {
		$('.section-bestof').mousemove(function(e){
			// on recupere les position X du pointeur puis la largeur de l'ecran
			var positionX = e.pageX;
			var windowWidth = $(window).width();
			var area = windowWidth/4;
			// Si le curseur entre dans la zone de gauche
			if (positionX < area) {
				// Fait apparaitre le bouton gauche en supprimant la classe hidden
				$('.slick-prev').removeClass('hidden');

			// Si le curseur entre dans la zone de droite
			} else if (positionX > parseInt(windowWidth - area)) {
				$('.slick-next').removeClass('hidden');
			
			// Si on n'est pas sur un des coté on fait disparaitre les fleches en ajotuant la classe hidden
			} else {
				$('.slick-prev').addClass('hidden');
				$('.slick-next').addClass('hidden');
			}
		});
	}