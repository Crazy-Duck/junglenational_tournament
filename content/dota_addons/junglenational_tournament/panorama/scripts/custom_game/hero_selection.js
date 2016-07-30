"use strict";
/* This file contains the scripts associated with hero_selection.xml.
 * This UI element provides a custom hero selection screen.
 *
 * By: Perry
 * Date: July 2015 */

//Define variables
var playerPanels = {};
var canEnter = false;

GameEvents.Subscribe( "picking_done", OnPickingDone );
if (Players.GetTeam(Players.GetLocalPlayer()) != 1) {
	//Subscribe to events
	GameEvents.Subscribe( "picking_time_update", OnTimeUpdate );
	GameEvents.Subscribe( "picking_player_pick", OnPlayerPicked );
}

var heroes = {
	"agi": [{"name":"npc_dota_hero_antimage", "background":"url('s2r://panorama/images/loadingscreens/witch_hunter_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_arc_warden", "background":"url('s2r://panorama/images/loadingscreens/broken_envoyarc_warden_broken_envoyarc_warden_loadingscreen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_bloodseeker", "background":"url('s2r://panorama/images/loadingscreens/hunt_of_the_weeping_beast_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_bounty_hunter", "background":"url('s2r://panorama/images/loadingscreens/bounty_scout_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_broodmother", "background":"url('s2r://panorama/images/loadingscreens/webs_of_perception/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_clinkz", "background":"url('s2r://panorama/images/loadingscreens/redbull_clinkz_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_drow_ranger", "background":"url('s2r://panorama/images/loadingscreens/traxex_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_ember_spirit", "background":"url('s2r://panorama/images/loadingscreens/mentor_high_plains/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_faceless_void", "background":"url('s2r://panorama/images/loadingscreens/ti6_keyart_faceless_void/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_gyrocopter", "background":"url('s2r://panorama/images/loadingscreens/flying_dutchman_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_juggernaut", "background":"url('s2r://panorama/images/loadingscreens/esl_dashing_bladelord_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_lone_druid", "background":"url('s2r://panorama/images/loadingscreens/the_wolf_hunter_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_luna", "background":"url('s2r://panorama/images/loadingscreens/conqueror_of_the_dark_moon_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_medusa", "background":"url('s2r://panorama/images/loadingscreens/emerald_ocean_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_meepo", "background":"url('s2r://panorama/images/loadingscreens/meepo_crystal_scavenger_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_mirana", "background":"url('s2r://panorama/images/loadingscreens/crescent_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_morphling", "background":"url('s2r://panorama/images/loadingscreens/renewed_jade_comet_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_naga_siren", "background":"url('s2r://panorama/images/loadingscreens/prismatic_empress_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_nevermore", "background":"url('s2r://panorama/images/loadingscreens/diabolical_fiend_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_nyx_assassin", "background":"url('s2r://panorama/images/loadingscreens/emperor_of_the_nyx_dynasty_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_phantom_assassin", "background":"url('s2r://panorama/images/loadingscreens/raiment_of_the_sacred_blossom_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_phantom_lancer", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_phantomlancer_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_razor", "background":"url('s2r://panorama/images/loadingscreens/empire_of_the_lightning_lord_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_riki", "background":"url('s2r://panorama/images/loadingscreens/frosty_blow_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_slark", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_slark_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_sniper", "background":"url('s2r://panorama/images/loadingscreens/dreamhack_sniper_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_spectre", "background":"url('s2r://panorama/images/loadingscreens/phantasmal_disruptions_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_templar_assassin", "background":"url('s2r://panorama/images/loadingscreens/black_lotus_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_terrorblade", "background":"url('s2r://panorama/images/loadingscreens/bts_corrupted_lord_loadingscreen1/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_ursa", "background":"url('s2r://panorama/images/loadingscreens/ursa_cryogenic_embrace_loadscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_vengefulspirit", "background":"url('s2r://panorama/images/loadingscreens/forsaken_wings_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_weaver", "background":"url('s2r://panorama/images/loadingscreens/envisioning_weaver_loading_screen/loadingscreen_tga.vtex')"}],
	"int": [{"name":"npc_dota_hero_bane", "background":"url('s2r://panorama/images/loadingscreens/heir_of_terror_loadin_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_batrider", "background":"url('s2r://panorama/images/loadingscreens/marauding_pyro_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_crystal_maiden", "background":"url('s2r://panorama/images/loadingscreens/crystalline_comet_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_dark_seer", "background":"url('s2r://panorama/images/loadingscreens/forgotten_tactician_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_dazzle", "background":"url('s2r://panorama/images/loadingscreens/shadowflame_loadingscreen/loadingscreen_tga.vtex')"}, 
			{"name":"npc_dota_hero_death_prophet", "background":"url('s2r://panorama/images/loadingscreens/awakened_thirst_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_disruptor", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_disruptor_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_enchantress", "background":"url('s2r://panorama/images/loadingscreens/amberlight_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_furion", "background":"url('s2r://panorama/images/loadingscreens/eternalseasons_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_invoker", "background":"url('s2r://panorama/images/loadingscreens/arsenal_magus_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_keeper_of_the_light", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_keeperofthelight_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_leshrac", "background":"url('s2r://panorama/images/loadingscreens/bts_leshrac_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_lich", "background":"url('s2r://panorama/images/loadingscreens/blizzard_tyrant_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_lina", "background":"url('s2r://panorama/images/loadingscreens/bewitching_flare_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_lion", "background":"url('s2r://panorama/images/loadingscreens/ancient_evil_ls/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_necrolyte", "background":"url('s2r://panorama/images/loadingscreens/apostle_of_decay_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_obsidian_destroyer", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_outworlddevourer_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_ogre_magi", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_ogremagi_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_puck", "background":"url('s2r://panorama/images/loadingscreens/eternalnymph_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_pugna", "background":"url('s2r://panorama/images/loadingscreens/narcissistic_leech_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_queenofpain", "background":"url('s2r://panorama/images/loadingscreens/regalia_of_the_ill_wind_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_rubick", "background":"url('s2r://panorama/images/loadingscreens/harlequin_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_shadow_demon", "background":"url('s2r://panorama/images/loadingscreens/umbral_descent_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_shadow_shaman", "background":"url('s2r://panorama/images/loadingscreens/tangki_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_silencer", "background":"url('s2r://panorama/images/loadingscreens/silencer_whisper_tribunal/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_skywrath_mage", "background":"url('s2r://panorama/images/loadingscreens/blessing_of_the_crested_dawn_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_storm_spirit", "background":"url('s2r://panorama/images/loadingscreens/raijins_tools_of_war_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_techies", "background":"url('s2r://panorama/images/loadingscreens/techies_arcana/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_tinker", "background":"url('s2r://panorama/images/loadingscreens/artillery_of_the_fortified_fabricator_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_venomancer", "background":"url('s2r://panorama/images/loadingscreens/deathbringer_loading_screen/loadingscreen_tga.vtex')"}, 
			{"name":"npc_dota_hero_visage", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_visage_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_warlock", "background":"url('s2r://panorama/images/loadingscreens/hs_fiend_summoner_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_windrunner", "background":"url('s2r://panorama/images/loadingscreens/deadly_feather_swing_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_winter_wyvern", "background":"url('s2r://panorama/images/loadingscreens/ice_splinters_ice_splinters_loadingscreen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_witch_doctor", "background":"url('s2r://panorama/images/loadingscreens/twilights_rest_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_zuus", "background":"url('s2r://panorama/images/loadingscreens/zeus_lord_of_heaven_zeus_lord_of_heaven_loading_screen/loadingscreen.vtex')"}],
	"str": [{"name":"npc_dota_hero_abaddon", "background":"url('s2r://panorama/images/loadingscreens/alliance_abbadon_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_alchemist", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_alchemist_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_axe", "background":"url('s2r://panorama/images/loadingscreens/searing_annihilator_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_beastmaster", "background":"url('s2r://panorama/images/loadingscreens/chimeras_anger_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_brewmaster", "background":"url('s2r://panorama/images/loadingscreens/ti6_keyart_brewmaster/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_bristleback", "background":"url('s2r://panorama/images/loadingscreens/wrathrunner_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_centaur", "background":"url('s2r://panorama/images/loadingscreens/lord_of_wilderness_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_chaos_knight", "background":"url('s2r://panorama/images/loadingscreens/champion_discord_closed_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_doom_bringer", "background":"url('s2r://panorama/images/loadingscreens/blazing_lord_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_dragon_knight", "background":"url('s2r://panorama/images/loadingscreens/ascension_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_earth_spirit", "background":"url('s2r://panorama/images/loadingscreens/es_demon_stone/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_earthshaker", "background":"url('s2r://panorama/images/loadingscreens/bindings_dragonforge/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_elder_titan", "background":"url('s2r://panorama/images/loadingscreens/harness_of_the_soulforged_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_huskar", "background":"url('s2r://panorama/images/loadingscreens/armor_of_reckless_vigor_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_kunkka", "background":"url('s2r://panorama/images/loadingscreens/bestowments_of_the_divine_anchor_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_legion_commander", "background":"url('s2r://panorama/images/loadingscreens/valkyrie_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_life_stealer", "background":"url('s2r://panorama/images/loadingscreens/bloody_ripper_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_lycan", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_lycan_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_magnataur", "background":"url('s2r://panorama/images/loadingscreens/esl_avenging_crusader_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_omniknight", "background":"url('s2r://panorama/images/loadingscreens/stalwart_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_pudge", "background":"url('s2r://panorama/images/loadingscreens/blackdeath_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_rattletrap", "background":"url('s2r://panorama/images/loadingscreens/battletrap_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_sand_king", "background":"url('s2r://panorama/images/loadingscreens/iron_sting_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_shredder", "background":"url('s2r://panorama/images/loadingscreens/lumberclaw_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_skeleton_king", "background":"url('s2r://panorama/images/loadingscreens/kings_spite_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_slardar", "background":"url('s2r://panorama/images/loadingscreens/magma_manta_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_spirit_breaker", "background":"url('s2r://panorama/images/loadingscreens/elemental_realms_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_sven", "background":"url('s2r://panorama/images/loadingscreens/fiend_cleaver_demon_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_tidehunter", "background":"url('s2r://panorama/images/loadingscreens/neptunian_servant_loading__screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_treant", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_treant_loadingscreen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_tusk", "background":"url('s2r://panorama/images/loadingscreens/barrier_rogue_loading_screen/loadingscreen_tga.vtex')"},
			{"name":"npc_dota_hero_undying", "background":"url('s2r://panorama/images/loadingscreens/undying_tomb_overlord_loading_screen/loadingscreen.vtex')"},
			{"name":"npc_dota_hero_wisp", "background":"url('s2r://panorama/images/loadingscreens/dota_keyart_io_loadingscreen/loadingscreen_tga.vtex')"}]
};

var picks = [];

/* Event Handlers
=========================================================================*/

/* Picking phase is done, allow the player to enter the game */
function OnPickingDone( data ) {
	$("#EnterGameBtn").RemoveClass( "disabled" );
	$("#EnterGameBtnTxt").text = "Enter Game";
	canEnter = true;
	GameUI.SetDefaultUIEnabled( DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, true );
}

/* Visual timer update */
function OnTimeUpdate( data ) {
	$("#TimerTxt").text = data.time;
}

/* A player has picked a hero */
function OnPlayerPicked( data ) {
	PlayerPicked( data.PlayerID, data.HeroName );
}

/* Functionality
=========================================================================*/

function LoadPicks() {
	var a = Math.floor(Math.random() * 32);
	var i = Math.floor(Math.random() * 36);
	var s = Math.floor(Math.random() * 33);
	var agility = heroes["agi"][a];
	var intelligence = heroes["int"][i];
	var strength = heroes["str"][s];
	
	$("#first_pick").style.backgroundImage = agility.background;
	$("#second_pick").style.backgroundImage = intelligence.background;
	$("#third_pick").style.backgroundImage = strength.background;
	
	picks.push(agility);
	picks.push(intelligence);
	picks.push(strength);
	
	GameEvents.SendCustomGameEventToServer( "picks_chosen", {
			"Team" :  Players.GetTeam(Players.GetLocalPlayer()), 
			"Picks" : {
				"Agility": agility.name, 
				"Intelligence": intelligence.name, 
				"Strength": strength.name
			}
		}
	);
}

function Pick (num) {
	SelectHero(picks[num].name);
}

/* Add an empty element for each player in the game (steam avatar plus space for hero portrait) */
function LoadPlayers() {
	//Get the players for both teams
	var radiantPlayers = Game.GetPlayerIDsOnTeam( DOTATeam_t.DOTA_TEAM_GOODGUYS );
	var direPlayers = Game.GetPlayerIDsOnTeam( DOTATeam_t.DOTA_TEAM_BADGUYS );

	//Assign radiant players
	$.Each( radiantPlayers, function( player ) {
		var playerPanel = Modular.Spawn( "picking_player", $("#LeftPlayers") );
		playerPanel.SetPlayer( player );

		//Save the panel for later
		playerPanels[player] = playerPanel;
	});

	//Assign dire players
	$.Each( direPlayers, function( player ) {
		var playerPanel = Modular.Spawn( "picking_player", $("#RightPlayers") );
		playerPanel.SetPlayer( player );
		playerPanel.SetIsRight( true );

		//Save the panel for later
		playerPanels[player] = playerPanel;
	});
}

/* A player has picked a hero, tell the player's panel a hero was picked,
 * show the hero was taken and if the player that picked is the local player
 * swap to the hero preview screen. */
function PlayerPicked( player, hero ) {
	//Update the player panel
	//playerPanels[player].SetHero( hero );

	//Disable the hero button
	//$('#'+hero).AddClass( "taken" );

	//Check if the pick was by the local player
	if ( player == Players.GetLocalPlayer() ) {
		SwitchToHeroPreview( hero );
	}
}

/* Switch the content of the screen to show the picked hero instead of the
 * pickable heroes. */
function SwitchToHeroPreview( heroName ) {
	var previewPanel = $.CreatePanel("Panel", $('#PostPickScreen'), "HeroPreview");
	previewPanel.BLoadLayoutFromString('<root><Panel><DOTAScenePanel style="width: 600px; height: 600px; opacity-mask: url(\'s2r://panorama/images/masks/softedge_box_png.vtex\');" unit="'+heroName+'"/></Panel></root>', false, false );

	$('#PostPickScreen').MoveChildBefore( previewPanel, $("#EnterGameBtn") );

	$('#PickList').style.visibility = 'collapse';
	$('#PostPickScreen').style.visibility = 'visible';
}

/* Select a hero, called when a player clicks a hero panel in the layout */
function SelectHero( heroName ) {
	//Send the pick to the server
	GameEvents.SendCustomGameEventToServer( "hero_selected", { HeroName: heroName } );
}

/* Enter the game by removing the picking screen, called when the player
 * clicks a button in the layout. */
function EnterGame() {
	if ( canEnter ) {
		$('#PickingScreen').DeleteAsync( 0.0 );
	}
}

/* Initialisation - runs when the element is created
=========================================================================*/
(function () {
	if (Players.GetTeam(Players.GetLocalPlayer()) != 1) {
		// Set panel visibility
		$('#PickList').style.visibility = 'visible';
		$('#PostPickScreen').style.visibility = 'collapse';

		// Load pickable heroes
		LoadPicks();
		
		// Load player elements
		LoadPlayers();
	} else {
		$('#PickingScreen').DeleteAsync( 0.0 );
	}
})();
