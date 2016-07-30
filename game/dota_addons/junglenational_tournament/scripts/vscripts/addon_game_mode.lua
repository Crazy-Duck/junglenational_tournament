-- This is the entry-point to your game mode and should be used primarily to precache models/particles/sounds/etc

require('internal/util')
require('junglenational')

function Precache( context )
--[[
  This function is used to precache resources/units/items/abilities that will be needed
  for sure in your game and that will not be precached by hero selection.  When a hero
  is selected from the hero selection screen, the game will precache that hero's assets,
  any equipped cosmetics, and perform the data-driven precaching defined in that hero's
  precache{} block, as well as the precache{} block for any equipped abilities.

  See JungleNational:PostLoadPrecache() in junglenational.lua for more information
  ]]

  DebugPrint("[JUNGLENATIONAL] Performing pre-load precache")

  -- Particles can be precached individually or by folder
  -- It it likely that precaching a single particle system will precache all of its children, but this may not be guaranteed

  -- Models can also be precached by folder or individually
  -- PrecacheModel should generally used over PrecacheResource for individual models

  -- Sounds can precached here like anything else

  -- Entire items can be precached by name
  -- Abilities can also be precached in this way despite the name

  -- Entire heroes (sound effects/voice/models/particles) can be precached with PrecacheUnitByNameSync
  -- Custom units from npc_units_custom.txt can also have all of their abilities and precache{} blocks precached in this way
  PrecacheUnitByNameSync("npc_dota_hero_enigma", context)
end

-- Create the game mode when we activate
function Activate()
  GameRules.JungleNational = JungleNational()
  GameRules.JungleNational:_InitJungleNational()
end
