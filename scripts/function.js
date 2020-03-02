	/*************/
	/* FONCTIONS */
	/*************/

	function onmouseleaveBubble() {
		$('.bubble').mouseleave(function(){
			// Meme code que celui de la fonction cultureAppear()
			var element = "#bubble-container";
			var winSize = $(window).width();
			var marginTop = winSize>1170?163:113;
			var minSize = winSize>1170?100:50;
			var maxSize = winSize>1170?250:150;
			var size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

			// lance un chiffre au hazard par rapport aux position x et y min et max de la div culture = ajouter la position aleatoire de la bulle
			var minX = 0; // récupère la dimension minX de la fenetre culture - on ajoutera la taille actuelle de la bulle pour eviter qu'elle soit hors champ
			var maxX = parseFloat($(element).width()-size); // récupère la dimension maxX de la fenetre culture - on enlevera la taille actuelle de la bulle
			var minY = parseFloat(size+marginTop); // récupère la dimension minY de la fenetre culture
			var maxY = winSize>1170?parseFloat($(element).height()+marginTop):parseFloat($(element).height()+30); // récupère la dimension maxY de la fenetre culture
			var positionX = parseFloat(Math.floor(Math.random() * (maxX - minX + 1)) + minX);
			var positionY = parseFloat(Math.floor(Math.random() * (maxY - minY + 1)) + minY);

			// Ajout de ses nouvelles proprietes au css de chaque bulles
			$(this).css({
				'width': size,
				'height': size,
				'left': positionX,
				'top': positionY
			});
		});
	}

	function parallaxeVideo(el, previousScroll, currentScroll, speed) {
		var element = '.'+arguments[0];

		if (isVisible(element)) {
			// On modifie la position y de l'element si jamais elle a bouée (en cas de resize de la fenetre)
			var windowWasResized = positionY != elementPositionY($(element)) ? true : false;

			// Corrige la position de l'image si on recharge la page a n'importe quel endroit
			if (previousScroll == 0 || windowWasResized) {
				positionY = elementPositionY($(element));
				var topMargin = currentScroll - positionY; // vérification de la position de la div a l'ecran (position actuelle - position de la div)
				previousScroll = topMargin; // Remplacement de l'emplacement initial de l'image
				var pixelmove = (parseInt(topMargin) /speed); // Récupère le nombre de pixel déjà déplacé (si - alors la div dépasse d'en haut)
			    $(element+' video').css('top', parseFloat(pixelmove)+'px');

			// Cycle habituel du déplacement du BG parallaxe
			} else {
				// Récupération de la position Y de la video qui doit avoir un effet parallaxe
				var posY = $(element+' video').css('top');
				var yFloat = parseFloat(posY.replace(/[^0-9-.,]/g, '')); // Transforme la chaine de caracteres en int					
				var newPosY = previousScroll-currentScroll; // Récupère le nombre de px decallé avec le scroll

			    $(element+' video').css('top', parseFloat(yFloat+newPosY)+'px');
				pSCulture = currentScroll;
			}
		}
	}

	function cultureAppear(resize, winSize) {
		// test la visibilité des bulles
		if (isVisible('#bubble-container')) {

			if ($('.bubble.visible').index() === -1 || resize === true) {
				// active les bulles une a unes dans une boucle en leur supprimant la classe hidden
				var element = "#bubble-container";
				var cpt = $('.bubble').length; // compte le nombre de bulles
	   			var timer = 0; // préparation du timer

	   			// Boucle pour chaque bulles
				for (var i=1; i<=cpt; i++) {				
					// lance un autre chiffre au hazard compris entre 50px et 150px = donnera la taille de la bulle
					var marginTop = winSize>1170?163:113;
					var minSize = winSize>1170?100:50;
					var maxSize = winSize>1170?250:150;
					var size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

					// lance un chiffre au hazard par rapport aux position x et y min et max de la div culture = ajouter la position aleatoire de la bulle
					var minX = 0; // récupère la dimension minX de la fenetre culture - on ajoutera la taille actuelle de la bulle pour eviter qu'elle soit hors champ
					var maxX = parseFloat($(element).width()-size); // récupère la dimension maxX de la fenetre culture - on enlevera la taille actuelle de la bulle
					var minY = parseFloat(size+marginTop); // récupère la dimension minY de la fenetre culture
					var maxY = winSize>1170?parseFloat($(element).height()+marginTop):parseFloat($(element).height()+30); // récupère la dimension maxY de la fenetre culture
					var positionX = parseFloat(Math.floor(Math.random() * (maxX - minX + 1)) + minX);
					var positionY = parseFloat(Math.floor(Math.random() * (maxY - minY + 1)) + minY);

					// Ajout de ses nouvelles proprietes au css de chaque bulles
					$('.bubble:nth-child('+i+')').css({
						'width': size,
						'height': size,
						'left': positionX,
						'top': positionY
					});
					// Cache les img pour que ca ne fasse pas de bug d'affichage

					// Activation de la bulle dans 0.2secondes
					setTimeout("$('.bubble:nth-child("+i+")').removeClass('hidden');", timer);
					setTimeout("$('.bubble:nth-child("+i+")').addClass('visible');", timer);

					// Incrementation du timer pour différer les affichages de bulles
					timer = parseInt(timer+200);
				}
			}

		// Si la fenêtre n'est pas visible on cache les bulles
		} else {
			$('.bubble').addClass('hidden');
			$('.bubble').removeClass('visible');
		}
	}

	function movePicture() {
		// verification si l'image a deja la classe active
		var activeSet = $('.section-about div .left img').attr('class');
		var this_img = $('.section-about div .left img');

		/*if (isVisible('.section-about div .left img')) {*/
		if (isVisible('.section-about .btn')) {
   			this_img.addClass('in')
   			this_img.removeClass('out');

       	// Si l'image n'est pas visible alors on donne des nouvelle proprietes a l'image et on lui supprime la classe active pour que ce soit l'effet out qui soit pris en compte
	    } else {
   			this_img.removeClass('in');
   			this_img.addClass('out');
	    }
	}

	function fadeSkillBloc() {
		var cpt = $('.skill-bloc').length;
		if (isVisible('.section-skill .bloc-container')) {
   			var timer = 0;
			for (var i=1; i<=cpt; i++) {
				setTimeout("$('.skill-bloc:nth-child("+i+")').addClass('in');", timer);
				setTimeout("$('.skill-bloc:nth-child("+i+")').removeClass('out');", timer);
				timer = parseInt(timer+200);
			}
	    } else {
   			$('.skill-bloc').addClass('out');
   			$('.skill-bloc').removeClass('in');
	    }
	}

	function moveEducationBloc() {
		var cpt = $('.education-bloc').length;

		if (isVisible('.section-education .bloc-container')) {
   			var timer = 0;
			for (var i=1; i<=cpt; i++) {
				var pair = i%2==0?'Bottom':'Top';

				setTimeout("$('.education-bloc:nth-child("+i+")').addClass('in"+pair+"');", timer);
				setTimeout("$('.education-bloc:nth-child("+i+")').removeClass('out"+pair+"');", timer);
				timer = parseInt(timer+200);
			}
	    } else {/*
   			$('.education-bloc').addClass('out');*/
   			$('.education-bloc').removeClass('inTop');
   			$('.education-bloc').removeClass('inBottom');
	    }
	}

	/* Les parallaxes ne fonctionnent plus avec chrome quand on est en device mobile*/
	function detectDevice() {
		var device = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pc';
		//console.log('Argument : '+arguments[0]+' - Arg len : '+arguments.length+' - Device final : '+device);
		var windowWidth = $(window).width();

		if (device == 'pc' && windowWidth > 1450) {
			return true;
		} else if (device == 'mobile' && windowWidth > 600) {
			return true;
		}
		return false;
	}

	// affiche ou cache le bouton pour remonter au top
	function activeSelectedMenu(activePage = null) {
		if (activePage != null) {
			var activeSet = $('#btn-menu-'+activePage).attr('class').split(" ")[1];
			if(activeSet === undefined) {
				$('.btn-menu').removeClass("active");
				$('#btn-menu-'+activePage).addClass("active");
			}

		} else {
			// annule les anciennes bordures
			//$('.btn-menu').removeClass("active");

			// Color le bouton du menu en fonction
			if (isVisible('#home')) {
				// verification si le bouton a déjà la classe active
				var activeSet = $('#btn-menu-home').attr('class').split(" ")[1];

				// Si le bouton de cette section n'a pas encore de classe active
				if(activeSet === undefined) {
					// On supprime la classe active de tous les bouton
					$('.btn-menu').removeClass("active");

					// On ajoute la classe active à ce bouton
					$('#btn-menu-home').addClass("active");
				}
			} else if (!isVisible('#home') && isVisible('#bestof')) {
				var activeSet = $('#btn-menu-bestof').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-bestof').addClass("active");
				}
			} else if (!isVisible('#bestof') && isVisible('#about')) {
				var activeSet = $('#btn-menu-about').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-about').addClass("active");
				}
			} else if (!isVisible('#about') && isVisible('#techno')) {
				var activeSet = $('#btn-menu-techno').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-techno').addClass("active");
				}
			} else if (!isVisible('#techno') && isVisible('#skill')) {
				var activeSet = $('#btn-menu-skill').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-skill').addClass("active");
				}
			} else if (!isVisible('#skill') && isVisible('#education')) {
				var activeSet = $('#btn-menu-education').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-education').addClass("active");
				}
			} else if (!isVisible('#education') && isVisible('#culture')) {
				var activeSet = $('#btn-menu-culture').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-culture').addClass("active");
				}
			} else if (!isVisible('#culture') && isVisible('#contact')) {
				var activeSet = $('#btn-menu-contact').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-contact').addClass("active");
				}
			} /*else if (!isVisible('#contact') && isVisible('#admin')) {
				var activeSet = $('#btn-menu-admin').attr('class').split(" ")[1];
				if(activeSet === undefined) {
					$('.btn-menu').removeClass("active");
					$('#btn-menu-admin').addClass("active");
				}
			}*/
		}
	}

	// Cache la barre de menu mobile lorsqu'on click n'importe ou dans la fenêtre
	function hideMenuBarOnclick() {
	    $('div:not(.menu-icon), #menu nav ul li a').click(function(e){
			if ($('#menu nav').is(":visible") && $('#menu .menu-icon').is(":visible")) {
				$('.menu-icon').removeClass('is-opened');
				$('#menu nav').hide();
			}
	    });
	}

	function lockMenuBar(forceLock = false) {
		if (forceLock) {
			// Affiche le bouton ToTop
			$('#totop').stop().fadeIn();
			// Bloque la barre de menu
			$('#menu').css({
				'position': 'fixed',
				'top': 0,
				'left': 0
			});

		} else {
			if (!isVisible('#home')) {
				// Affiche le bouton ToTop
				$('#totop').stop().fadeIn();
				// Bloque la barre de menu
				$('.section-home').css('z-index', '200'); // corrige le bug qui affichait le menu et d'autres elements sur 1/10sec lorsqu'on cliquait sur le bouton de navigation rapide
				$('#menu').css({
					'position': 'fixed',
					'top': 0,
					'left': 0
				});
				// Ajoute une marge bottom a la section home pour rattrapper le décallage créé par la position fixed du menu
				$('.section-home').css('margin-bottom', '59px');

			} else {
				$('#menu').css('position', 'relative');
				$('#totop').stop().fadeOut();
				$('.section-home').css('margin-bottom', '0');
			}
		}
	}

	function moveHeaderItems() {
		var elementClass = arguments[0];
		var direction = arguments.length > 0 && arguments[1] !== undefined ? arguments[1] : 'right';
		var this_class = '.'+elementClass;

		// Si la div home est visible
		if (isVisible(this_class)) {
			var windowPosition = $(this).scrollTop();
			var elementPosition = elementPositionY($(this_class));
			var decale = parseInt(elementPosition - windowPosition);
			var rotateIphone = parseFloat(decale/2+25);

			// Vérification de la direction vers laquelle on veut deplacer le texte
			if (direction == 'right') {
				$(this_class+' img#mockup_iphone').css({
					'right': parseInt(decale+100)+'px',
					'bottom': -parseInt((decale)-225)+'px',
					'transform': 'rotate('+rotateIphone+'deg)'
				});
				$(this_class+' img#mockup_keyboard').css({
					'left': parseInt(decale-20)+'px',
					'top': parseInt((decale)+100)+'px'/*,
					'transform': 'rotate('+rotateKeyboard+'deg)'*/
				});
			} 
		}
	}

	function socialAppear() {
		if (isVisible('#social-network')) {
			$('#social-network ul li').removeClass('hidden');
			$('#social-network ul li a').removeClass('hidden');
		    $('#social-network ul li').addClass('active');
		    $('#social-network ul li a').addClass('active');
		} else {
		    $('#social-network ul li').addClass('hidden');
		    $('#social-network ul li a').addClass('hidden');
			$('#social-network ul li').removeClass('active');
			$('#social-network ul li a').removeClass('active');
		}
	}

	function skillAppear() {
		// Si la fenetre des techno est visible on affiche les bulles
		if (isVisible('.section-skill .skill-bloc')) {
			// Faire apparaitre les 6 bulles
			$('.section-skill .skill-bloc').fadeIn();
		}
	}

	function technoAppear(technoNumber = 8) {
		// Reglage du pas en focntion du nombre de techno
		$step = technoNumber > 8 ? 50 : 200;
		// Si la fenetre des techno est visible on affiche les bulles
		if (isVisible('.section-techno .section-appear-techno .technos') || technoNumber > 8) {
			// Faire apparaitre les 8 bulles

			// Applique un top = 0 aux svg masques
			$('.technos li svg:nth-child(2)').css('top',0); /* pour que les svg masques s'affichent correctement sur SAFARI */

			// Supprime la classe disable
			var timerSVG = 0;
			for (var i=1; i<=technoNumber; i++) {
				setTimeout("$('.technos li:nth-child("+i+") svg:nth-child(2)').addClass('active');", timerSVG);
				setTimeout("$('.technos li:nth-child("+i+") svg:nth-child(2).active').removeClass('disable');", timerSVG);
				timerSVG = parseInt(timerSVG+$step);
			}

		// Si la fenetre n'est pas visible alors on desactive les bulles
		} else {
			// Désactivation des bulles 
			if(technoNumber < 8) {
				$('.technos svg:nth-child(2)').removeClass('active');
				$('.technos svg:nth-child(2)').addClass('disable');
			}
		}
	}

	/**
	 *	Parallaxe pour image background à l'interieur d'une div parent
	 *	@param previousScroll // ancienne valeur de scrolltop
	 *	@param currentScroll // Nouvelle valeur de scrolltop
	 *	@param contentDiv // Conteneur de l'image background à décaller
	 *	@param speed // Vitesse à appliquer au déplacement
	 */
	function parallaxeScroll(previousScroll, currentScroll, contentDivClass, speed) {
		// On modifie la position y de l'element si jamais elle a bouée (en cas de resize de la fenetre)
		var windowWasResized = positionY != elementPositionY($('.'+contentDivClass)) ? true : false;

		// Corrige la position de l'image si on recharge la page a n'importe quel endroit
		if (previousScroll == 0 || windowWasResized) {
			positionY = elementPositionY($('.'+contentDivClass));
			var topMargin = currentScroll - positionY; // vérification de la position de la div a l'ecran (position actuelle - position de la div)
			previousScroll = topMargin; // Remplacement de l'emplacement initial de l'image
			var pixelmove = (parseInt(topMargin) /speed); // Récupère le nombre de pixel déjà déplacé (si - alors la div dépasse d'en haut)
	        $('.'+contentDivClass).css('background-position', '50% '+(-parseFloat(pixelmove)+'px')); // Modification du placement du BG dans la div 

		// Cycle habituel du déplacement du BG parallaxe
		} else {
			// Récupération de la position Y du background qui doit avoir un effet parallaxe
			var backgroundPos = $('.'+contentDivClass).css('background-position').split(" "); //now contains an array like ["0%", "50px"]
			var xPos = backgroundPos[0], yPos = backgroundPos[1];
			var yFloat = parseFloat(backgroundPos[1].replace(/[^0-9-.,]/g, '')); // Transforme la chaine de caracteres en int					
			var newScroll = previousScroll-currentScroll; // Récupère le nombre de px decallé avec le scroll
			var newBgPos = newScroll/speed; // Valeur qui sera ajoutée au scroll de l'image d'arreire plan

		    $('.'+contentDivClass).css('background-position', '50% '+(yFloat+newBgPos)+'px');
		}
	}

	// Return boolean when an element is visible on screen
	function isVisible(element) {
	    var viewPortHeight = $(window).height(), // Viewport Height
	        scrollTop = $(window).scrollTop(), // Scroll Top
	        currElementPosY = $(element).offset().top,
	        elementHeight = $(element).height();
	    
	    return (currElementPosY + elementHeight > scrollTop && currElementPosY < (viewPortHeight + scrollTop));
	}

	// Position Y de l'element
	function elementPositionY(element) {
		return currElementPosY = $(element).offset().top;
	}

	/**
	 *	Retourne le resultat a savoir si on descend ou si on monte dans le scroll
	 */
	function scrollDown(previousScroll) {
		if ($(this).scrollTop() > previousScroll)
			return true;
		else
			return false;
	}

	/**
	 *	Ajoute l'effet d'apparition et de disparition d'un element suivant le scroll
	 *	PREREQUIS : nécessite de placer un 'opacity: 1;' en CSS sur cet élément
	 */
	function hideWithScroll(elementClass, minScroll, maxScroll) {
		// Préparation de l'opacité de l'élément
		if ($(this).scrollTop()==minScroll) {
			$('.'+elementClass).css('opacity', 1);

		// l'effet qui cache et fait apparaitre le title en fondu
		} else if ($(this).scrollTop()>minScroll && $(this).scrollTop()<maxScroll) { 
			var decale = parseInt(maxScroll-minScroll);
			var new_opacity = parseInt(maxScroll-$(this).scrollTop())/(decale/100);
			$('.'+elementClass).css('opacity', new_opacity/100);

		// Si le scroll est dépassé = élément complètement invisible
		} else {
			$('.'+elementClass).css('opacity', 0);
		}
	}

	/**
	 *	Affiche les éléments uniquement si leurs div parents sont visible à l'ecran
	 *	PREREQUIS : nécessite que la div parent ait un height défini.
	 *	nécessite aussi un 'display: none;' sur tous les élément de la div parent, exemple : .divparent * {display:none;}
	 */
	function lload() {
		var className = arguments[0]; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var effect = arguments.length > 0 && arguments[1] !== undefined ? arguments[1] : 'fade'; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var speed = arguments.length > 0 && arguments[2] !== undefined ? arguments[2] : 'fast'; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		if (isVisible('.'+className)) {
			switch (effect) {
				case 'fade':
					$('.'+className+' *').fadeIn(speed);
					break;
				case 'other':
					$('.'+className+' *').fadeIn(speed);
					break;
			}
		}
	}

	/**
	 *	Effectue un scroll adouci vers l'id ciblé par le lien cliqué
	 *	IMPORTANT : nécessite jquery UI : src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
	 */
	function goToTargetId(targetId) {
		var targetId = arguments[0]; // Pour corriger l'incompatibilité de passage d'arguments pour Safari

		// On active l'effet uniquement si on est sur pc
		//if ($(window).width() > 800) { 
			$("html, body").stop().animate({scrollTop: $('#'+targetId).offset().top}, 500, 'swing');
			return false;
		//} 
		
	}

	/** 	
	 *	Montre ou cache le menu
	 */
	function toggleNav() {
		if ($('#menu nav').is(":hidden")) {
			$('.menu-icon').addClass('is-opened');
			$('#menu nav').slideDown("slow");
		} else {
			$('.menu-icon').removeClass('is-opened');
			$('#menu nav').hide();
			//$('#menu nav').css('display','none');
		}
	}

	/**
	 *	Calcul le périmètre du cercle
	 */
	function circlePerimeter() {
		var ray = arguments.length > 0 && arguments[0] !== undefined ? parseInt(arguments[0]) : 100; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var perimeter = 2 * Math.PI * ray;
		return Math.ceil(perimeter); // retourne l'entier superieur ou egal
	}

	/**
	 *	Calcul le nombre (du perimetre du cercle à afficher) en rapport avec le %
	 */
	function percentPerimeter() {
		var percent = arguments.length > 0 && arguments[0] !== undefined ? parseInt(arguments[0]) : 100; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var toshow = circlePerimeter() * (percent/100);
		return Math.ceil(toshow);
	}

	/**
	 *	Ajoute l'effet d'apparition et de disparition d'un element suivant le scroll
	 *	PREREQUIS : nécessite de placer un 'opacity: 1;' en CSS sur cet élément
	 */
	function showWithScroll() {
		var elementClass = arguments[0]; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var minScroll = parseInt(arguments[1]); // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var maxLengthScroll = arguments.length > 0 && arguments[2] !== undefined ? parseInt(arguments[2]) : 200; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var fadeSpeed = arguments.length > 0 && arguments[3] !== undefined ? parseInt(arguments[3]) : 5; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		
		var this_class = '.'+elementClass;

		if (isVisible(this_class)) {	
	    	var decale = 150; // on force un décallage de 150px pour faire afficher les elements a partir de 200 du haut de la div (sinon c'est trop rapide t on ne voit pas l'effet)
	    	var new_opacity = 0;
	    	/*console.log('positionY+taille/2 : '+parseInt(minScroll+$(this_class).height()/2));
	    	console.log('scrollbottom : '+scrollBottom());
	    	console.log('decallage : '+((($(this).scrollTop()-parseInt(minScroll+$(this_class).height())))/100)/fadeSpeed);*/

	    	// Lorsqu'on veut faire disparaitre le contenu en descendant dans une autre div
	    	if ($(this).scrollTop() >= parseInt($(this_class).height()/2)+parseInt(minScroll-decale)) {
	    		new_opacity = -((($(this).scrollTop()-parseInt(minScroll+$(this_class).height())))/100)/fadeSpeed;
				$(this_class).css('opacity', new_opacity);

	    	// Lorsqu'on entre par le haut dans la section
	    	} else {
	    		new_opacity = (parseInt(scrollBottom()-parseInt(minScroll+decale))/100)/fadeSpeed;
				$(this_class).css('opacity', new_opacity);
	    	}
	    }
	}

	/**
	 *	Ajoute l'effet d'apparition depuis la gauche vers la droite d'un element en fonction le scroll
	 */
	function moveInfo() {
		var elementClass = arguments[0]; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		var direction = arguments.length > 0 && arguments[1] !== undefined ? parseInt(arguments[1]) : 'right'; // Pour corriger l'incompatibilité de passage d'arguments pour Safari
		
		var this_class = '.'+elementClass;

		// Si la div info est visible
		if (isVisible(this_class)) {
			var windowPosition = $(this).scrollTop();
			var elementPosition = elementPositionY($(this_class));
			var decale = parseInt(elementPosition - windowPosition)/2;
			// Vérification de la direction vers laquelle on veut deplacer le texte
			if (direction == 'right') {
				$(this_class+' p').css('left', -decale+'px');
			} else {
				$(this_class+' p').css({
					'right': -decale+'px',
					'float': 'left'
				});
			}
		}
	}

	/* // Retourne le nombre de pixel a partir du bas du document html
	function scrollBottom1() {
		return $(document).height() - $(window).height() - $(window).scrollTop();
	}*/
	function scrollBottom() {
		return parseInt($(window).height() + $(window).scrollTop());
	}
	
	function applyColor(percent) {
		switch(percent) {
			case (percent <= 10):
				return '#be2a2a';
				break;
			case (percent <= 20):
				return '#ae5c27';
				break;
			case (percent <= 30):
				return '#a49025';
				break;
			case (percent <= 40):
				return '#82a425';
				break;
			case (percent <= 50):
				return '#5bb929';
				break;
			case (percent <= 60):
				return '#2bc95b';
				break;
			case (percent <= 70):
				return '#2bc46d';
				break;
			case (percent <= 80):
				return '#2cc983';
				break;
			case (percent <= 80):
				return '#46d6b7';
				break;
			case (percent <= 100):
				return '#75b3df';
				break;
		}
	}