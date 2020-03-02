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

		onresizeEvents();
		
		isOkForParallaxe = detectDevice();
		isOkForParallaxeMobile = detectDevice('mobile');
		lockMenuBar(true); // Bloque ou pas la barre du menu
	    hideWithScroll('title', 0, 400); // effet de disparition/apparition du text header
	    activeSelectedMenu('techno'); 

	    technoAppear(200); // Charge les bulle de techno
	
		// Déclaration des évenements
	    onscrollEvents();
	    hideMenuBarOnclick(); // Cache la barre de menu mobile lorsqu'on click n'importe ou dans la fenêtre

	}());

	// Fonction contenant tous les evenements onscroll
	function onscrollEvents() {
		$(window).scroll(function(){
	    	// Déclaration des varibles
			var currentScroll = $(this).scrollTop();

			// Blocage du menu si on ne voit plus l'image header
			lockMenuBar(true);
	    	activeSelectedMenu('techno'); 

	    	// Affichage lazyload des sections
	    	hideWithScroll('title', 0, 400); // effet de disparition/apparition du text header
	    	//lload('section-general', 'fade', 'slow'); // effet d'apparition d'un contenu complet, dès que la div parent est visible à l'écran
	    	
	    	// Affiche les éléments de la section A propos si elle est visible
	    	showWithScroll('section-appear-techno', elementPositionY($('.section-techno')), 200, 3);

	    	// Affiche les bulles de technos
	    	technoAppear(200);
	    });
	}

	function onresizeEvents() {
		$(window).resize(function(){
			isOkForParallaxe = detectDevice();
			isOkForParallaxeMobile = detectDevice('mobile');
	    	technoAppear(200); // Charge les bulle de techno
		});
	}