-- The overall game state has changed
function JungleNational:_OnGameRulesStateChange(keys)
  if JungleNational._reentrantCheck then
    return
  end

  local newState = GameRules:State_Get()
  if newState == DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD then
    self.bSeenWaitForPlayers = true
  elseif newState == DOTA_GAMERULES_STATE_INIT then
    --Timers:RemoveTimer("alljointimer")
  elseif newState == DOTA_GAMERULES_STATE_HERO_SELECTION then
    JungleNational:PostLoadPrecache()
    JungleNational:OnAllPlayersLoaded()

    if USE_CUSTOM_TEAM_COLORS_FOR_PLAYERS then
      for i=0,9 do
        if PlayerResource:IsValidPlayer(i) then
          local color = TEAM_COLORS[PlayerResource:GetTeam(i)]
          PlayerResource:SetCustomPlayerColor(i, color[1], color[2], color[3])
        end
      end
    end
  elseif newState == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
    JungleNational:OnGameInProgress()
  end

  JungleNational._reentrantCheck = true
  JungleNational:OnGameRulesStateChange(keys)
  JungleNational._reentrantCheck = false
end

-- An NPC has spawned somewhere in game.  This includes heroes
function JungleNational:_OnNPCSpawned(keys)
  if JungleNational._reentrantCheck then
    return
  end

  local npc = EntIndexToHScript(keys.entindex)

  if npc:IsRealHero() and npc.bFirstSpawned == nil then
    npc.bFirstSpawned = true
    JungleNational:OnHeroInGame(npc)
  end

  JungleNational._reentrantCheck = true
  JungleNational:OnNPCSpawned(keys)
  JungleNational._reentrantCheck = false
end

-- An entity died
function JungleNational:_OnEntityKilled( keys )
  if JungleNational._reentrantCheck then
    return
  end

  -- The Unit that was Killed
  local killedUnit = EntIndexToHScript( keys.entindex_killed )
  -- The Killing entity
  local killerEntity = nil

  if keys.entindex_attacker ~= nil then
    killerEntity = EntIndexToHScript( keys.entindex_attacker )
  end
  
  if killedUnit:IsRealHero() then 
    DebugPrint("KILLED, KILLER: " .. killedUnit:GetName() .. " -- " .. killerEntity:GetName())    
	Notifications:TopToAll({hero=killedUnit:GetName(), duration=3.0, imagestyle="landscape", duration=3.0})
	Notifications:TopToAll({text=" was killed ", style={color="red"}, continue=true})
	if killerEntity:IsRealHero() then 
	  Notifications:TopToAll({text=" by ", style={color="red"}, continue=true})
	  Notifications:TopToAll({hero=killerEntity:GetName(), imagestyle="landscape", continue=true})
	end
    if END_GAME_ON_KILLS and killedUnit:GetDeaths() >= KILLS_TO_END_GAME_FOR_TEAM then
      GameRules:SetSafeToLeave( true )
      if killedUnit:GetTeam() == DOTA_TEAM_GOODGUYS then
        GameRules:SetGameWinner( DOTA_TEAM_BADGUYS )
		GameRules:MakeTeamLose( DOTA_TEAM_GOODGUYS )
      else
        GameRules:SetGameWinner( DOTA_TEAM_GOODGUYS )
		GameRules:MakeTeamLose( DOTA_TEAM_BADGUYS )
      end
    end

    --PlayerResource:GetTeamKills
    if SHOW_KILLS_ON_TOPBAR then
      GameRules:GetGameModeEntity():SetTopBarTeamValue ( DOTA_TEAM_BADGUYS, GetTeamHeroKills(DOTA_TEAM_BADGUYS) )
      GameRules:GetGameModeEntity():SetTopBarTeamValue ( DOTA_TEAM_GOODGUYS, GetTeamHeroKills(DOTA_TEAM_GOODGUYS) )
    end
  end

  JungleNational._reentrantCheck = true
  JungleNational:OnEntityKilled( keys )
  JungleNational._reentrantCheck = false
end

-- This function is called once when the player fully connects and becomes "Ready" during Loading
function JungleNational:_OnConnectFull(keys)
  if JungleNational._reentrantCheck then
    return
  end

  JungleNational:_CaptureJungleNational()

  local entIndex = keys.index+1
  -- The Player entity of the joining user
  local ply = EntIndexToHScript(entIndex)
  
  local userID = keys.userid

  self.vUserIds = self.vUserIds or {}
  self.vUserIds[userID] = ply

  JungleNational._reentrantCheck = true
  JungleNational:OnConnectFull( keys )
  JungleNational._reentrantCheck = false
end
