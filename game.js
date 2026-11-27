(()=> {
'use strict';
const $=id=>document.getElementById(id);
const SAVE_KEY='dk-kanto-save-v2';
const species={
 Bulbasaur:{emoji:'🌿',type:'Cỏ/Độc',hp:38,atk:8,def:5,skill:'Roi Mây',color:0x65b96a},
 Charmander:{emoji:'🔥',type:'Lửa',hp:30,atk:11,def:3,skill:'Hỏa Tốc',color:0xef8b45},
 Squirtle:{emoji:'💧',type:'Nước',hp:35,atk:8,def:6,skill:'Súng Nước',color:0x61b9df},
 Pidgey:{emoji:'🪽',type:'Bay',hp:25,atk:7,def:3,skill:'Gió Xoáy',color:0xb9a77e},
 Rattata:{emoji:'🐭',type:'Thường',hp:23,atk:8,def:2,skill:'Cắn Nhanh',color:0x9b80a9},
 Caterpie:{emoji:'🐛',type:'Côn trùng',hp:27,atk:6,def:2,skill:'Tơ Trói',color:0x83c96c},
 Oddish:{emoji:'🌱',type:'Cỏ/Độc',hp:31,atk:7,def:4,skill:'Lá Cắt',color:0x67b66e},
 Psyduck:{emoji:'🦆',type:'Nước',hp:34,atk:9,def:4,skill:'Sóng Siêu Âm',color:0xe6c95d},
 Geodude:{emoji:'🪨',type:'Đá/Đất',hp:40,atk:9,def:8,skill:'Lăn Đá',color:0x9b927e},
 Zubat:{emoji:'🦇',type:'Độc/Bay',hp:29,atk:9,def:3,skill:'Sóng Âm',color:0x7d78b9},
 Diglett:{emoji:'🟤',type:'Đất',hp:27,atk:10,def:4,skill:'Đào Đất',color:0xb98a61},
 Bellsprout:{emoji:'🌿',type:'Cỏ/Độc',hp:36,atk:12,def:4,skill:'Roi Dây',color:0x79b65e},
 Spearow:{emoji:'🐦',type:'Thường/Bay',hp:28,atk:10,def:3,skill:'Mổ',color:0xc68c5b},
 Mewtwo:{emoji:'🧬',type:'Tâm linh',hp:150,atk:25,def:18,skill:'Sóng Tâm Linh',color:0xb18bd1},
 Seel:{emoji:'🦭',type:'Nước',hp:38,atk:9,def:6,skill:'Sóng Băng',color:0x9bd6e8},Lapras:{emoji:'🦕',type:'Nước/Băng',hp:62,atk:13,def:10,skill:'Băng Tuyết',color:0x6aa9c8},Dratini:{emoji:'🐉',type:'Rồng',hp:34,atk:12,def:5,skill:'Đuôi Rồng',color:0x7bb7d8},Sandshrew:{emoji:'🦔',type:'Đất',hp:39,atk:10,def:8,skill:'Cuộn Đất',color:0xd9b36b}
};
const evolution={Bulbasaur:{level:16,to:'Ivysaur',emoji:'🌺',hp:58,atk:13,def:8,skill:'Lá Dao'},Ivysaur:{level:32,to:'Venusaur',emoji:'🌸',hp:82,atk:18,def:12,skill:'Bão Hoa'},Charmander:{level:16,to:'Charmeleon',emoji:'🦎',hp:48,atk:17,def:6,skill:'Hỏa Long'},Charmeleon:{level:36,to:'Charizard',emoji:'🐉',hp:78,atk:23,def:10,skill:'Long Hỏa'},Squirtle:{level:16,to:'Wartortle',emoji:'🐢',hp:58,atk:13,def:10,skill:'Thủy Pháo'},Wartortle:{level:36,to:'Blastoise',emoji:'🐢',hp:84,atk:19,def:16,skill:'Đại Thủy Pháo'}};
const wildByZone={
 route:['Pidgey','Rattata','Caterpie'],
 forest:['Caterpie','Oddish','Pidgey'],
 lake:['Psyduck','Geodude','Oddish'],
 cave:['Geodude','Rattata','Psyduck','Zubat','Diglett'],
 viridian:['Bellsprout','Spearow','Rattata'],
 island:['Seel','Dratini','Sandshrew','Lapras']
};
let state={party:[],dex:[],gold:500,balls:5,potions:3,steps:0,zone:'pallet',quest:0,oakTalk:false,badges:[],trainersDefeated:[]};
try{const old=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(old)state={...state,...old};else{const legacy=JSON.parse(localStorage.getItem('dk-kanto-save')||'null');if(legacy&&legacy.party){const n=legacy.party.name;const starter=n==='Sproutle'?'Bulbasaur':n==='Embercub'?'Charmander':n==='Aquaff'?'Squirtle':species[n]?n:'Bulbasaur';state.party=[makeMon(starter,legacy.party.level||5)];state.gold=legacy.gold||500;state.balls=legacy.balls||5;state.steps=legacy.steps||0;state.dex=[starter];}}}catch{}
state.badges=Array.isArray(state.badges)?state.badges:[];state.discoveredZones=Array.isArray(state.discoveredZones)?state.discoveredZones:['pallet'];
state.trainersDefeated=Array.isArray(state.trainersDefeated)?state.trainersDefeated:[];state.crystalShards=Array.isArray(state.crystalShards)?state.crystalShards:[];state.crystalQuest=!!state.crystalQuest;state.islandQuest=!!state.islandQuest;state.islandShells=Array.isArray(state.islandShells)?state.islandShells:[];state.islandReward=!!state.islandReward;state.rideUnlocked=!!state.rideUnlocked;state.worldMinutes=Number.isFinite(state.worldMinutes)?state.worldMinutes:540;state.gymClear=!!state.gymClear;
function makeMon(name,lv){const s=species[name]||species.Pidgey;return {name,level:lv||3,xp:0,hp:s.hp+(lv-1)*3,maxHp:s.hp+(lv-1)*3,atk:s.atk+Math.floor((lv-1)*1.2),def:s.def+Math.floor((lv-1)*.5),current:s.hp+(lv-1)*3,skill:s.skill,emoji:s.emoji,type:s.type};}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(state))}catch(e){toast('Không thể lưu: bộ nhớ trình duyệt đầy.')}} 
function toast(t){const el=$('toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2100)}
function hud(){const lead=state.party[0];$('gold').textContent=state.gold;$('balls').textContent=state.balls;$('playerLevel').textContent='Lv. '+(lead?lead.level:1);$('quest').textContent=questText();$('questTitle').textContent='CHƯƠNG '+(state.quest+1)}
function questText(){if(state.islandQuest&&!state.islandReward)return 'Đảo San Hô: Thu thập ngọc trai '+state.islandShells.length+'/3 và quay lại Người Giữ Đảo.';if(state.crystalQuest&&!state.trainersDefeated.includes('crystal-guardian'))return 'Hang Thạch Anh: Thu thập tinh thể '+state.crystalShards.length+'/3 và quay lại Nhà Nghiên Cứu.';return ['Gặp Giáo sư Oak tại phòng nghiên cứu ở thị trấn Pallet.','Đi vào bãi cỏ Đường 1 và thắng trận đầu tiên.','Bắt thêm một Pokémon để mở rộng đội hình.','Khám phá Rừng Thanh Mộc ở phía tây nam.','Tìm đường đến Hồ Xanh và nói chuyện với người câu cá.','Bạn đã hoàn thành hành trình mở đầu Kanto!'][Math.min(state.quest,5)]}
function setQuest(n){state.quest=Math.max(state.quest,n);hud();save()}
function show(id){$(id).classList.remove('hidden')}function hide(id){$(id).classList.add('hidden')}
function panel(title,eyebrow,html){$('panelTitle').textContent=title;$('panelEyebrow').textContent=eyebrow;$('panelContent').innerHTML=html;show('panel')}
function spriteFor(name){const map={Bulbasaur:'bulbasaur',Ivysaur:'bulbasaur',Venusaur:'bulbasaur',Charmander:'charmander',Charmeleon:'charmander',Charizard:'charmander',Squirtle:'squirtle',Wartortle:'squirtle',Blastoise:'squirtle',Pidgey:'pidgey',Rattata:'rattata',Caterpie:'caterpie',Oddish:'oddish',Psyduck:'psyduck',Geodude:'geodude','Thủ Lĩnh Đá':'geodude',Zubat:'zubat',Diglett:'diglett',Bellsprout:'bellsprout',Spearow:'spearow',Seel:'seel',Lapras:'lapras',Dratini:'dratini',Sandshrew:'sandshrew',Mewtwo:'mewtwo','Thủ Lĩnh Lá':'bellsprout'};return map[name]?'assets/pokemon/'+map[name]+'.svg':null}
function spriteSheetFor(name){const map={Bulbasaur:'bulbasaur',Ivysaur:'bulbasaur',Venusaur:'bulbasaur',Charmander:'charmander',Charmeleon:'charmander',Charizard:'charmander',Squirtle:'squirtle',Wartortle:'squirtle',Blastoise:'squirtle',Pidgey:'pidgey',Rattata:'rattata',Caterpie:'caterpie',Oddish:'oddish',Psyduck:'psyduck',Geodude:'geodude',Zubat:'zubat',Diglett:'diglett',Bellsprout:'bellsprout',Spearow:'spearow',Seel:'seel',Lapras:'lapras',Dratini:'dratini',Sandshrew:'sandshrew',Mewtwo:'mewtwo'};return map[name]?'assets/sprites/'+map[name]+'-idle.svg':null}
function monArtMarkup(name,emoji){const sheet=spriteSheetFor(name);if(sheet)return '<span class="pokemon-sprite" role="img" aria-label="'+name+'" style="--sprite-sheet:url(\''+sheet+'\')"></span>';const src=spriteFor(name);return src?'<img src="'+src+'" alt="'+name+'" loading="eager" onerror="this.remove();this.parentElement.textContent=\''+emoji+'\'">':emoji}
function setMonArt(id,name,emoji){const el=$(id);const sheet=spriteSheetFor(name);el.dataset.species=sheet?sheet.split('/').pop().replace('-idle.svg',''):'generic';el.innerHTML=monArtMarkup(name,emoji);el.classList.remove('spawn','attack-lunge','skill-strike','hit-flash','dodge','enemy-lunge');void el.offsetWidth;el.classList.add('spawn')}
function monRow(m,i){const ev=evolution[m.name];const ready=ev&&m.level>=ev.level;return '<div class="slot"><span class="icon">'+monArtMarkup(m.name,m.emoji)+'</span><div><b>'+m.name+'</b><small>Lv.'+m.level+' · '+m.type+' · HP '+m.current+'/'+m.maxHp+' · XP '+m.xp+'/40'+(ev?' · Tiến hóa Lv.'+ev.level:'')+'</small></div>'+(ready?'<button data-evolve="'+i+'">TIẾN HÓA</button>':'')+'<button data-heal="'+i+'">Thuốc</button></div>'}
function petCompanion(){
 if(!companion||!state.party.length)return toast('Bạn chưa có Pokémon đồng hành.');
 const m=state.party[0],type=String(m.type||'');
 const line=type.includes('Lửa')?'Pokémon của bạn phấn khích, ngọn lửa bừng sáng!':type.includes('Nước')?'Pokémon vui vẻ vẫy đuôi, những giọt nước lấp lánh!':type.includes('Cỏ')?'Pokémon nghiêng đầu, lá trên người rung rinh!':type.includes('Bay')?'Pokémon dang cánh vui vẻ bên bạn!':type.includes('Đá')?'Pokémon khẽ rung mình đầy hào hứng!':m.name+' vui vẻ kêu lên khi được bạn quan tâm!';
 sound('catch');if(companion&&scene){scene.tweens.add({targets:companion,scaleX:1.18,scaleY:1.18,duration:140,yoyo:true,ease:'Back.Out'});const bubble=scene.add.text(companion.x,companion.y-48,'♥ '+m.name,{fontSize:'13px',fontStyle:'bold',color:'#fff',backgroundColor:'#173c32',padding:{x:7,y:4}}).setOrigin(.5).setDepth(9999);scene.tweens.add({targets:bubble,y:bubble.y-30,alpha:0,duration:1100,onComplete:()=>bubble.destroy()})}
 toast(line);
}
function selectCompanion(i){
 if(!Number.isInteger(i)||i<0||i>=state.party.length)return;
 if(i===0)return toast(state.party[0].name+' đang đồng hành cùng bạn.');
 const chosen=state.party.splice(i,1)[0];state.party.unshift(chosen);save();hud();setCompanionMon();openTeam();toast(chosen.name+' đã trở thành Pokémon đồng hành!');
}
function openTeam(){panel('ĐỘI HÌNH','TỐI ĐA 6 POKÉMON','<p>Đồng hành cùng bạn: '+state.party.length+'/6 · Pokédex: '+state.dex.length+'</p><div class="slotlist">'+(state.party.map((m,i)=>'<div class="team-entry '+(i===0?'active-lead':'')+'">'+monRow(m,i)+'<button data-lead="'+i+'" '+(i===0?'disabled':'')+'>'+(i===0?'ĐANG ĐỒNG HÀNH':'CHỌN ĐỒNG HÀNH')+'</button></div>').join('')||'<p>Chưa có Pokémon. Hãy bắt đầu hành trình!</p>')+'</div>');$('panelContent').querySelectorAll('[data-lead]').forEach(b=>b.onclick=()=>selectCompanion(Number(b.dataset.lead)));$('panelContent').querySelectorAll('[data-heal]').forEach(b=>b.onclick=()=>usePotion(Number(b.dataset.heal)));$('panelContent').querySelectorAll('[data-evolve]').forEach(b=>b.onclick=()=>evolveMon(Number(b.dataset.evolve)))}
function evolveMon(i){sound('evolve');const m=state.party[i],ev=m&&evolution[m.name];if(!ev||m.level<ev.level)return toast('Chưa đủ cấp để tiến hóa!');const old=m.name;m.name=ev.to;m.emoji=ev.emoji;m.skill=ev.skill;m.maxHp=ev.hp;m.hp=ev.hp;m.current=ev.hp;m.atk=ev.atk;m.def=ev.def;m.type=m.type+' · Tiến hóa';if(!state.dex.includes(m.name))state.dex.push(m.name);if(i===0)setCompanionMon();save();hud();openTeam();toast('✨ '+old+' đã tiến hóa thành '+m.name+'!')}
function usePotion(i){const m=state.party[i];if(!m||state.potions<1){toast('Bạn không còn thuốc hồi phục!');return}if(m.current>=m.maxHp){toast('Pokémon đang đầy HP.');return}state.potions--;m.current=Math.min(m.maxHp,m.current+20);save();openTeam();toast(m.name+' hồi phục 20 HP.')}
function openBag(){panel('TÚI ĐỒ','VẬT PHẨM CỦA BẠN','<div class="itemrow"><span>🔴 Bóng Poké</span><b>'+state.balls+'</b></div><div class="itemrow"><span>🧪 Thuốc hồi phục</span><b>'+state.potions+'</b></div><div class="itemrow"><span>🪙 Vàng</span><b>'+state.gold+'</b></div><div class="itemrow"><span>🎒 Mua 3 bóng Poké</span><button id="buyBalls">60 vàng</button></div><div class="itemrow"><span>🧪 Mua 1 thuốc</span><button id="buyPotion">45 vàng</button></div>');$('buyBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();openBag()};$('buyPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();openBag()}}
function openDex(){const seen=state.dex||[];const cards=Object.entries(species).map(([name,s])=>'<div class="dex-card '+(seen.includes(name)?'seen':'unseen')+'"><span>'+ (seen.includes(name)?monArtMarkup(name,s.emoji):'❔') +'</span><div><b>'+(seen.includes(name)?name:'Chưa khám phá')+'</b><small>'+(seen.includes(name)?s.type+' · '+s.skill:'Gặp Pokémon này để mở khóa')+'</small></div></div>').join('');panel('POKÉDEX','SỔ TAY SINH VẬT KANTO','<p>Đã ghi nhận <b>'+seen.length+'/'+Object.keys(species).length+'</b> loài cơ bản. Các dạng tiến hóa được ghi riêng khi mở khóa.</p><div class="dex-grid">'+cards+'</div>')}
const travelStops=[
 {id:'pallet',name:'Thị trấn Pallet',x:330,y:390,emoji:'🏠',desc:'Khởi đầu hành trình'},
 {id:'route',name:'Đường 1',x:900,y:500,emoji:'🌿',desc:'Bãi cỏ và Pokémon hoang dã'},
 {id:'forest',name:'Rừng Thanh Mộc',x:400,y:760,emoji:'🌳',desc:'Khu rừng phía tây nam'},
 {id:'lake',name:'Hồ Xanh',x:1200,y:780,emoji:'🌊',desc:'Bờ hồ và Pokémon hệ Nước'},
 {id:'caveInterior',name:'Hang Thạch Anh',x:3325,y:500,emoji:'💎',desc:'Hang sâu nhiều tinh thể'},
 {id:'viridian',name:'Thành phố Viridian',x:4500,y:550,emoji:'🏙️',desc:'Nhà thi đấu và cửa hàng'},
 {id:'island',name:'Đảo San Hô',x:6300,y:680,emoji:'🏝️',desc:'Đảo nhiệt đới ngoài khơi'}
];
function questTargets(){
 const out=[];
 const add=(id,title,zone,x,y,icon,detail)=>out.push({id,title,zone,x,y,icon,detail});
 if(state.quest===0&&!state.oakTalk)add('main-oak','Gặp Giáo sư Oak','pallet',300,340,'!','Nói chuyện với Giáo sư Oak.');
 if(state.quest===1)add('main-battle','Thắng trận đầu tiên','route',900,500,'⚔','Tìm bãi cỏ Đường 1 và chiến đấu.');
 if(state.quest===2)add('main-catch','Bắt thêm Pokémon','route',900,500,'🔴','Làm suy yếu Pokémon hoang dã rồi dùng bóng Poké.');
 if(state.quest===3)add('main-forest','Khám phá Rừng Thanh Mộc','forest',390,760,'!','Đi đến khu rừng phía tây nam.');
 if(state.quest===4)add('main-lake','Gặp người câu cá','lake',1020,735,'!','Tìm người câu cá bên Hồ Xanh.');
 if(state.crystalQuest&&!state.trainersDefeated.includes('crystal-guardian')){
  if(state.crystalShards.length<3){[['1',3160,300],['2',3450,650],['3',3550,330]].forEach(([id,x,y])=>{if(!state.crystalShards.includes(id))add('crystal-'+id,'Tinh thể cổ '+id,'caveInterior',x,y,'💎','Thu thập tinh thể rồi quay lại Nhà Nghiên Cứu.')})}
  else add('crystal-return','Quay lại Nhà Nghiên Cứu','caveInterior',3440,480,'?','Đã đủ ba tinh thể. Hãy nhận thử thách Mewtwo.');
 }else if(!state.crystalQuest)add('crystal-start','Nhận nhiệm vụ tinh thể','caveInterior',3440,480,'!','Nói chuyện với Nhà Nghiên Cứu trong hang.');
 if(state.islandQuest&&!state.islandReward){
  if(state.islandShells.length<3){[['1',5940,250],['2',6500,720],['3',6800,300]].forEach(([id,x,y])=>{if(!state.islandShells.includes(id))add('pearl-'+id,'Ngọc trai '+id,'island',x,y,'🐚','Thu thập ngọc trai trên đảo.')})}
  else add('pearl-return','Quay lại Người Giữ Đảo','island',6250,450,'?','Đã đủ ba ngọc trai. Quay lại nhận phần thưởng.');
 }else if(!state.islandQuest)add('island-start','Nhận nhiệm vụ Đảo San Hô','island',6250,450,'!','Nói chuyện với Người Giữ Đảo.');
 return out;
}
function openWorldMap(){
 if(!player||busy)return toast('Bạn chỉ có thể mở bản đồ khi đang tự do di chuyển.');
 const stops=travelStops.filter(p=>state.discoveredZones.includes(p.id));
 const current=travelStops.find(p=>p.id===state.zone);
 const targets=questTargets();
 const pins=travelStops.map(p=>'<span class="map-pin '+(state.discoveredZones.includes(p.id)?'unlocked':'locked')+'" style="left:'+((p.x/7100)*92+4)+'%;top:'+((p.y/1400)*82+9)+'%" title="'+p.name+'">'+(state.discoveredZones.includes(p.id)?p.emoji:'?')+'</span>').join('');
 const questPins=targets.map(q=>'<span class="quest-map-pin" style="left:'+((q.x/7100)*92+4)+'%;top:'+((q.y/1400)*82+9)+'%" title="'+q.title+'">'+q.icon+'</span>').join('');
 const buttons=stops.map(p=>'<button class="travel-stop" data-travel="'+p.id+'" '+(p.id===state.zone?'disabled':'')+'><span>'+p.emoji+'</span><b>'+p.name+'</b><small>'+p.desc+'</small><em>'+(p.id===state.zone?'ĐANG Ở ĐÂY':'DỊCH CHUYỂN')+'</em></button>').join('');
 const objectives=targets.map(q=>'<div class="quest-target"><span>'+q.icon+'</span><div><b>'+q.title+'</b><small>'+q.detail+' · '+q.zone+'</small></div></div>').join('')||'<p class="map-hint">Chưa có mục tiêu đang chờ. Hãy tiếp tục khám phá!</p>';
 panel('BẢN ĐỒ KANTO','ĐÃ KHÁM PHÁ '+stops.length+'/'+travelStops.length+' KHU VỰC · '+targets.length+' MỤC TIÊU','<div class="world-map-visual"><div class="map-land"></div>'+pins+questPins+'<span class="map-you">📍 BẠN ĐANG Ở: '+(current?current.name:'KANTO')+'</span></div><p class="map-hint">⭐ Biểu tượng vàng là mục tiêu nhiệm vụ. Chỉ khu vực đã ghé thăm mới mở dịch chuyển nhanh.</p><h3 class="map-section-title">MỤC TIÊU ĐANG CHỜ</h3><div class="quest-target-list">'+objectives+'</div><h3 class="map-section-title">DỊCH CHUYỂN NHANH</h3><div class="travel-grid">'+buttons+'</div>');
 $('panelContent').querySelectorAll('[data-travel]').forEach(b=>b.onclick=()=>travelTo(b.dataset.travel));
}
function travelTo(id){
 const stop=travelStops.find(p=>p.id===id);
 if(!stop||!state.discoveredZones.includes(id))return toast('Bạn chưa khám phá khu vực này.');
 if(!player||busy)return toast('Không thể dịch chuyển lúc này.');
 stopMove();rideActive=false;if(rideBadge)rideBadge.setVisible(false);const rideBtn=$('ride');if(rideBtn)rideBtn.textContent='🌊 CƯỠI LAPRAS';
 player.setPosition(stop.x,stop.y);player.body.reset(stop.x,stop.y);
 scene.physics.world.setBounds(0,0,7100,1400);player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(15,15,7080,1370));
 scene.cameras.main.setBounds(0,0,7100,1400);scene.cameras.main.startFollow(player,true,.12,.12);scene.cameras.main.centerOn(stop.x,stop.y);
 setZone(id);save();hud();hide('panel');toast('Đã dịch chuyển đến '+stop.name+'.');
}
function openQuests(){
 const main=['Gặp Giáo sư Oak tại phòng nghiên cứu.','Thắng trận đầu tiên trên Đường 1.','Bắt thêm một Pokémon.','Khám phá Rừng Thanh Mộc.','Đến Hồ Xanh và trò chuyện.','Hoàn thành hành trình mở đầu Kanto.'];
 const mainRows=main.map((q,i)=>'<div class="task"><b>'+(i<state.quest?'✓ ':i===state.quest?'◆ ':'○ ')+q+'</b><small>'+(i<state.quest?'Đã hoàn thành':i===state.quest?'Nhiệm vụ hiện tại':'Chưa mở khóa')+'</small></div>').join('');
 const side=[{name:'Hang Thạch Anh',desc:state.trainersDefeated.includes('crystal-guardian')?'Đã đánh bại Mewtwo':!state.crystalQuest?'Chưa nhận nhiệm vụ':state.crystalShards.length+'/3 tinh thể',done:state.trainersDefeated.includes('crystal-guardian')},{name:'Đảo San Hô',desc:state.islandReward?'Đã hoàn thành · Lapras đã mở khóa':!state.islandQuest?'Chưa nhận nhiệm vụ':state.islandShells.length+'/3 ngọc trai',done:state.islandReward}].map(q=>'<div class="task side-task"><b>'+(q.done?'✓ ':'◆ ')+q.name+'</b><small>'+(q.done?'Hoàn thành':q.desc)+'</small></div>').join('');
 const targets=questTargets();
 panel('NHẬT KÝ HÀNH TRÌNH','CỐT TRUYỆN & NHIỆM VỤ PHỤ',mainRows+'<h3 class="map-section-title">NHIỆM VỤ PHỤ</h3>'+side+'<h3 class="map-section-title">HỆ THỐNG HUY HIỆU</h3><div class="badge-status">🏅 Huy hiệu Đá: '+(state.badges.includes('Đá')?'ĐÃ NHẬN':'CHƯA NHẬN')+'</div><div class="badge-status">🌿 Huy hiệu Rừng: '+(state.badges.includes('Rừng')?'ĐÃ NHẬN':'CHƯA NHẬN')+'</div><button class="primary" id="gymChallenge" '+(state.badges.includes('Đá')?'disabled':'')+'>⚔ '+(state.badges.includes('Đá')?'ĐÃ CHINH PHỤC NHÀ THI ĐẤU':'THỬ THÁCH NHÀ THI ĐẤU')+'</button><small class="muted">Đối thủ cấp 10 · Huy hiệu chỉ nhận một lần</small><p class="map-hint">Còn '+targets.length+' mục tiêu. Mở BẢN ĐỒ để xem vị trí đánh dấu.</p>');
 $('gymChallenge').onclick=()=>{hide('panel');startBattle(true)};
}
let game,scene,player,keys={},heldDir=null,moveLoop=null,busy=false,lastEncounter=0,nearNpc=false,grassAreas=[],sprintHeld=false;
let audioEnabled=true,audioCtx=null;
const signatureMoves={
 Bulbasaur:{name:'Roi Mây',kind:'vine-whip',bonus:8,description:'Dây leo quất mạnh từ hai bên'},Ivysaur:{name:'Lá Dao',kind:'leaf-blade',bonus:10,description:'Lưỡi lá xoáy cắt ngang'},Venusaur:{name:'Bão Hoa',kind:'petal-storm',bonus:13,description:'Bão cánh hoa bao phủ đấu trường'},
 Charmander:{name:'Hỏa Tốc',kind:'flame-dash',bonus:9,description:'Lao tới để lại vệt lửa'},Charmeleon:{name:'Hỏa Long',kind:'dragon-flame',bonus:12,description:'Rồng lửa bùng nổ'},Charizard:{name:'Long Hỏa',kind:'skyfire',bonus:15,description:'Hỏa long giáng từ trên cao'},
 Squirtle:{name:'Súng Nước',kind:'water-shot',bonus:8,description:'Tia nước áp lực cao'},Wartortle:{name:'Thủy Pháo',kind:'hydro-wave',bonus:11,description:'Sóng nước quét ngang'},Blastoise:{name:'Đại Thủy Pháo',kind:'hydro-cannon',bonus:15,description:'Pháo nước đa luồng'},
 Pidgey:{name:'Gió Xoáy',kind:'wind-dive',bonus:7,description:'Lượn vòng tạo lốc'},Rattata:{name:'Cắn Nhanh',kind:'quick-bite',bonus:7,description:'Lao tới cắn chớp nhoáng'},Caterpie:{name:'Tơ Trói',kind:'silk-bind',bonus:7,description:'Tơ quấn thành mạng'},Oddish:{name:'Lá Cắt',kind:'leaf-blade',bonus:8,description:'Lá sắc bay thành vòng'},Psyduck:{name:'Sóng Siêu Âm',kind:'psy-wave',bonus:9,description:'Sóng âm lan thành xung'},Geodude:{name:'Lăn Đá',kind:'rock-roll',bonus:9,description:'Khối đá xoáy lao tới'},Zubat:{name:'Sóng Âm',kind:'sonic-wave',bonus:9,description:'Sóng âm hình nón'},Diglett:{name:'Đào Đất',kind:'burrow-burst',bonus:9,description:'Trồi lên cùng đất đá'},Bellsprout:{name:'Roi Dây',kind:'vine-whip',bonus:10,description:'Nhiều dây leo quất liên tiếp'},Spearow:{name:'Mổ',kind:'drill-peck',bonus:9,description:'Mũi khoan lao từ trên cao'},Mewtwo:{name:'Sóng Tâm Linh',kind:'psychic-crush',bonus:16,description:'Quả cầu tâm linh nén năng lượng'},
 Seel:{name:'Sóng Băng',kind:'ice-wave',bonus:10,description:'Làn sóng băng tràn tới'},Lapras:{name:'Băng Tuyết',kind:'blizzard',bonus:14,description:'Bão tuyết phủ kín sân'},Dratini:{name:'Đuôi Rồng',kind:'dragon-tail',bonus:11,description:'Đuôi rồng quét thành vòng'},Sandshrew:{name:'Cuộn Đất',kind:'sand-coil',bonus:10,description:'Cuộn tròn tạo lốc cát'}
};
function signatureMoveFor(mon){return signatureMoves[mon&&mon.name]||{name:mon&&mon.skill||'Đòn đặc biệt',kind:'type-burst',bonus:7,description:'Đòn đặc biệt'};}
const signatureStatus={Bulbasaur:'bind',Ivysaur:'bind',Venusaur:'bind',Charmander:'burn',Charmeleon:'burn',Charizard:'burn',Squirtle:'bind',Wartortle:'bind',Blastoise:'bind',Pidgey:'bind',Rattata:'stun',Caterpie:'bind',Oddish:'poison',Psyduck:'stun',Geodude:'bind',Zubat:'poison',Diglett:'bind',Bellsprout:'poison',Spearow:'stun',Mewtwo:'stun',Seel:'freeze',Lapras:'freeze',Dratini:'stun',Sandshrew:'bind'};
const battleStatusInfo={burn:{label:'BỎNG',icon:'🔥',dot:3},poison:{label:'TRÚNG ĐỘC',icon:'☠️',dot:4},freeze:{label:'ĐÓNG BĂNG',icon:'❄️'},stun:{label:'CHOÁNG',icon:'⚡'},bind:{label:'TRÓI CHÂN',icon:'🕸️'}};

function spawnSignatureSkill(arena,move){
 if(!arena||!move)return;
 const fx=document.createElement('div');fx.className='signature-vfx '+move.kind;
 for(let i=0;i<8;i++){const p=document.createElement('i');p.style.setProperty('--i',i);p.style.setProperty('--delay',(i*35)+'ms');p.style.setProperty('--dx',((i-3.5)*30)+'px');p.style.setProperty('--dy',((i%2?1:-1)*(32+(i%3)*13))+'px');p.style.setProperty('--rot',(i*45)+'deg');fx.appendChild(p)}
 const core=document.createElement('b');core.className='signature-core';fx.appendChild(core);
 arena.appendChild(fx);setTimeout(()=>fx.remove(),1250);
}
function moveVisualType(type){
 const t=String(type||'');
 if(t.includes('Lửa'))return 'fire';if(t.includes('Băng'))return 'ice';if(t.includes('Nước'))return 'water';if(t.includes('Cỏ'))return 'grass';if(t.includes('Độc'))return 'poison';if(t.includes('Tâm linh'))return 'psychic';if(t.includes('Đá')||t.includes('Đất'))return 'earth';if(t.includes('Bay'))return 'air';return 'normal';
}
function spawnElementalImpact(arena,kind){
 if(!arena)return;
 const burst=document.createElement('div');burst.className='move-burst '+kind;
 const core=document.createElement('b');core.className='impact-core';burst.appendChild(core);
 for(let i=0;i<12;i++){const shard=document.createElement('i');shard.style.setProperty('--angle',(i*30)+'deg');shard.style.setProperty('--delay',(i*14)+'ms');shard.style.setProperty('--distance',(68+(i%3)*18)+'px');burst.appendChild(shard)}
 arena.appendChild(burst);setTimeout(()=>burst.remove(),1050);
 arena.classList.remove('impact');void arena.offsetWidth;arena.classList.add('impact');setTimeout(()=>arena.classList.remove('impact'),430);
}
function setArenaEnvironment(arena,kind){
 if(!arena)return;
 arena.dataset.environment=kind||'normal';
 arena.classList.remove('environment-active');void arena.offsetWidth;arena.classList.add('environment-active');
 setTimeout(()=>arena.classList.remove('environment-active'),1150);
}
function sound(kind){if(!audioEnabled)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!audioCtx)audioCtx=new C();if(audioCtx.state==='suspended')audioCtx.resume();const now=audioCtx.currentTime;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);const tones={hit:[180,95,.12,'square'],special:[320,720,.24,'sawtooth'],fire:[210,920,.3,'sawtooth'],water:[620,280,.28,'sine'],grass:[390,780,.25,'triangle'],ice:[880,430,.3,'sine'],earth:[120,65,.22,'square'],air:[720,1080,.2,'sine'],poison:[260,130,.28,'sawtooth'],psychic:[440,990,.38,'triangle'],catch:[540,880,.22,'sine'],win:[440,660,.34,'triangle'],evolve:[260,980,.55,'sine'],step:[90,70,.035,'triangle']};const t=tones[kind]||tones.hit;o.type=t[3];o.frequency.setValueAtTime(t[0],now);o.frequency.exponentialRampToValueAtTime(t[1],now+t[2]);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.11,now+.015);g.gain.exponentialRampToValueAtTime(.0001,now+t[2]);o.start(now);o.stop(now+t[2]+.02)}catch(e){}}
function setZone(z){state.zone=z;if(!state.discoveredZones.includes(z)){state.discoveredZones.push(z);if(travelStops.some(p=>p.id===z)&&z!=='pallet'){state.gold+=35;state.potions+=1;toast('Khám phá mới: +35 vàng và +1 thuốc hồi phục!')}save();hud()}const names={island:'ĐẢO SAN HÔ · KANTO',viridian:'THÀNH PHỐ VIRIDIAN · KANTO',caveInterior:'HANG ĐÁ THẠCH ANH · TẦNG SÂU',shop:'CỬA HÀNG PALLET · KANTO',center:'TRUNG TÂM POKÉMON · KANTO',pallet:'THỊ TRẤN PALLET · KANTO',route:'ĐƯỜNG 1 · KANTO',forest:'RỪNG THANH MỘC · KANTO',lake:'HỒ XANH · KANTO',cave:'HANG ĐÁ THẠCH ANH · KANTO'};$('zone').textContent=names[z];$('maptag').textContent=names[z]}
function addDepthTree(s,x,y,scale=1){
 const root=s.add.container(x,y).setDepth(y);
 const shadow=s.add.ellipse(3,15,48*scale,13*scale,0x173a25,.38);
 const trunk=s.add.rectangle(0,2,12*scale,42*scale,0x795037).setStrokeStyle(2,0x513623,.8);
 const canopy=s.add.container(0,-20*scale);
 canopy.add([s.add.ellipse(0,-7*scale,58*scale,47*scale,0x245b39),s.add.ellipse(-13*scale,-12*scale,38*scale,38*scale,0x347d49),s.add.ellipse(14*scale,-15*scale,39*scale,37*scale,0x438f51),s.add.ellipse(0,-27*scale,34*scale,28*scale,0x68a95c),s.add.ellipse(-9*scale,-30*scale,11*scale,7*scale,0xb1d77b,.58)]);
 root.add([shadow,trunk,canopy]);
 s.tweens.add({targets:canopy,angle:1.8,duration:1700+(x%5)*130,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:(x+y)%900});
 return root;
}
function drawWorld(s){
 const g=s.add.graphics(),W=1500,H=1050;
 g.fillStyle(0x438c59,1);g.fillRect(0,0,W,H);
 for(let y=0;y<H;y+=48)for(let x=0;x<W;x+=48){g.fillStyle(((x/48+y/48)%2)?0x3e8755:0x468f5b,1);g.fillRect(x,y,48,48);if((x*7+y*11)%9===0){g.fillStyle(0xc1d978,1);g.fillRect(x+11,y+17,3,6);g.fillRect(x+28,y+29,3,4)}}
 // Central roads and town square
 g.fillStyle(0xc8b48a,1);g.fillRect(0,440,W,112);g.fillRect(660,0,120,H);g.fillStyle(0xe4d1a6,1);for(let x=0;x<W;x+=44)g.fillRect(x,450,29,4);for(let y=0;y<H;y+=40)g.fillRect(700,y,4,25);
 // Lake
 g.fillStyle(0x2479a5,1);g.fillRoundedRect(1060,680,330,250,36);g.lineStyle(5,0x72c8dc,.9);g.strokeRoundedRect(1060,680,330,250,36);for(let i=0;i<24;i++){g.lineStyle(2,0x9ce3ed,.7);g.lineBetween(1080+(i*47)%285,700+(i*29)%205,1100+(i*47)%285,700+(i*29)%205)}
 // Forest canopy patches
 for(let i=0;i<65;i++){const x=20+(i*197)%570,y=20+(i*113)%390;g.fillStyle(0x285c3e,1);g.fillCircle(x,y,22);g.fillStyle(0x347d4a,1);g.fillCircle(x-9,y-9,19);g.fillStyle(0x4c9a59,1);g.fillCircle(x+7,y-12,12)}
 // Foreground trees: layered crowns, trunks and shadows add a stronger depth cue.
 [[48,390,.9],[150,365,1.05],[260,395,.92],[365,355,1.08],[500,390,.95],[65,505,.82],[530,520,.9],[1120,610,.85]].forEach(([tx,ty,sc])=>addDepthTree(s,tx,ty,sc));
 // Houses
 const house=(x,y,c)=>{g.fillStyle(0x4c4a55,1);g.fillRect(x-8,y+28,150,95);g.fillStyle(c,1);g.fillTriangle(x-18,y+32,x+65,y-28,x+158,y+32);g.fillStyle(0xe5d2a9,1);g.fillRect(x+48,y+65,34,58);g.fillStyle(0x7eb4ca,1);g.fillRect(x+12,y+51,26,25);g.fillRect(x+96,y+51,26,25)};
 house(160,180,0xa64e50);house(380,180,0x477ca1);house(880,160,0x9b704b);
 // Tall grass encounter patches
 const grass=(x,y,w,h)=>{grassAreas.push({x,y,w,h});for(let yy=y;yy<y+h;yy+=13)for(let xx=x;xx<x+w;xx+=13){g.fillStyle(0x267444,1);g.fillRect(xx,yy,11,11);g.fillStyle(0x83c85e,1);g.fillTriangle(xx+1,yy+10,xx+5,yy-2,xx+7,yy+10)}};
 grass(40,600,420,300);grass(810,590,190,270);grass(850,30,190,230);grass(485,820,150,155);
 // Signs and rocks
 for(const [x,y] of [[620,380],[990,530],[500,830],[1180,630]]){g.fillStyle(0x725037,1);g.fillRect(x,y,8,28);g.fillStyle(0xf0c45b,1);g.fillRect(x-12,y-9,32,15)}
 s.add.text(190,115,'THỊ TRẤN PALLET',{fontFamily:'monospace',fontSize:'23px',color:'#fff3cf',stroke:'#26432e',strokeThickness:6});
 s.add.text(75,575,'ĐƯỜNG 1',{fontFamily:'monospace',fontSize:'17px',color:'#fff',stroke:'#244a32',strokeThickness:5});
 s.add.text(35,920,'RỪNG THANH MỘC',{fontFamily:'monospace',fontSize:'16px',color:'#d7f2bd',stroke:'#183d2a',strokeThickness:5});
 s.add.text(1110,950,'HỒ XANH',{fontFamily:'monospace',fontSize:'17px',color:'#d7f5ff',stroke:'#17415c',strokeThickness:5});
}
function questMarkForNpc(n){
 const label=n.label;
 if(label==='GIÁO SƯ OAK'&&state.quest===0&&!state.oakTalk)return '!';
 if(label==='NGƯỜI CÂU CÁ'&&state.quest===4)return '!';
 if(label==='NHÀ NGHIÊN CỨU'&&(!state.crystalQuest||state.crystalShards.length===3&&!state.trainersDefeated.includes('crystal-guardian')))return state.crystalQuest?'?':'!';
 if(label==='NGƯỜI GIỮ ĐẢO'&&(!state.islandQuest||state.islandShells.length===3&&!state.islandReward))return state.islandQuest?'?':'!';
 if(label.startsWith('TINH THỂ CỔ')&&state.crystalQuest&&!state.crystalShards.includes(label.slice(-1)))return '💎';
 if(label.startsWith('NGỌC TRAI')&&state.islandQuest&&!state.islandShells.includes(label.slice(-1)))return '🐚';
 if(n.id&&['route-ace','forest-ace','cave-ace'].includes(n.id)&&!state.trainersDefeated.includes(n.id))return '⚔';
 if(label==='NHÀ THI ĐẤU VIRIDIAN'&&!state.badges.includes('Rừng'))return '🏟';
 return '';
}
function syncQuestMarkers(){
 if(!scene||!scene.npcs)return;
 scene.npcs.forEach(n=>{
  const mark=questMarkForNpc(n);
  if(mark&&!n.questMark){n.questMark=scene.add.text(n.x,n.y-34,mark,{fontSize:'19px',fontStyle:'bold',color:'#ffe17a',stroke:'#392817',strokeThickness:4,backgroundColor:'#182b25cc',padding:{x:4,y:1}}).setOrigin(.5).setDepth(n.y+20);scene.tweens.add({targets:n.questMark,y:n.y-41,alpha:.65,duration:550,yoyo:true,repeat:-1,ease:'Sine.easeInOut'})}
  if(n.questMark){n.questMark.setVisible(!!mark);if(mark&&n.questMark.text!==mark)n.questMark.setText(mark)}
 });
}
function addNpc(s,x,y,emoji,label){const shadow=s.add.ellipse(x,y+15,25,7,0x10251b,.34).setDepth(y-1);const halo=s.add.circle(x,y,22,0xb9f2c8,.0).setStrokeStyle(1,0xc9f5d8,.24).setDepth(y);const t=s.add.text(x,y,emoji,{fontSize:'30px'}).setOrigin(.5).setDepth(y+1);const tag=s.add.text(x,y+27,label,{fontSize:'10px',fontStyle:'bold',color:'#fff',stroke:'#172b23',strokeThickness:4,backgroundColor:'#102b23aa',padding:{x:4,y:2}}).setOrigin(.5).setDepth(y+2);s.tweens.add({targets:t,y:y-4,duration:720+(x%4)*95,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:(x+y)%500});s.tweens.add({targets:halo,scale:1.22,alpha:.08,duration:1350,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:(x+y)%700});s.tweens.add({targets:t,angle:2,duration:1900+(x%4)*160,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:(x+y)%800});s.tweens.add({targets:shadow,scaleX:1.12,alpha:.24,duration:950,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});return {x,y,obj:t,label,shadow,halo,tag,questMark:null}} 
function drawInterior(s,x,y,w,h,title,accent){
 const g=s.add.graphics();g.fillStyle(0x182b39,1);g.fillRect(x,y,w,h);g.fillStyle(0x987b58,1);g.fillRect(x+18,y+18,w-36,h-36);g.fillStyle(0xc8b58e,1);g.fillRect(x+30,y+30,w-60,h-60);
 g.fillStyle(0x344b5b,1);g.fillRect(x+18,y+18,w-36,42);g.fillStyle(accent,1);g.fillRect(x+34,y+31,12,12);
 s.add.text(x+w/2,y+39,title,{fontFamily:'monospace',fontSize:'19px',color:'#fff4d5',stroke:'#263544',strokeThickness:4}).setOrigin(.5);
 g.fillStyle(0x70543b,1);g.fillRect(x+65,y+130,w-130,18);g.fillStyle(0x4c392c,1);g.fillRect(x+75,y+148,w-150,48);
 g.fillStyle(0x3c5d68,1);g.fillRect(x+55,y+h-115,w-110,35);g.fillStyle(0x9ac6bf,1);g.fillRect(x+75,y+h-105,38,14);
 // Outer walls with a walkable doorway at the bottom.
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+90,y+h-8,w/2-90,16);wall(x+w-90,y+h-8,w/2-90,16);
 return {x,y,w,h};
}
function drawCaveInterior(s){
 const g=s.add.graphics(),x=3000,y=100,w=650,h=820;g.fillStyle(0x252b35,1);g.fillRect(x,y,w,h);g.fillStyle(0x55515a,1);g.fillRoundedRect(x+18,y+18,w-36,h-36,22);
 for(let i=0;i<95;i++){const px=x+35+(i*83)%575,py=y+75+(i*137)%700;g.fillStyle(i%3===0?0x887e8d:0x68616b,1);g.fillTriangle(px,py+17,px+14,py-15,px+29,py+17);if(i%5===0){g.fillStyle(0x70c9d2,1);g.fillTriangle(px+9,py+12,px+14,py-5,px+19,py+12)}}
 g.fillStyle(0x34303a,1);g.fillRect(x+40,y+90,w-80,h-180);g.fillStyle(0x403b45,1);g.fillRect(x+58,y+110,w-116,h-220);
 s.add.text(x+w/2,y+45,'HANG THẠCH ANH · TẦNG SÂU',{fontFamily:'monospace',fontSize:'18px',color:'#d8f3f5',stroke:'#28232d',strokeThickness:5}).setOrigin(.5);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+90,y+h-8,w/2-90,16);wall(x+w-90,y+h-8,w/2-90,16);
 // Lớp rêu phát sáng là vùng có thể gặp Pokémon trong hang.
 grassAreas.push({x:x+190,y:y+245,w:270,h:390});for(let i=0;i<38;i++){const px=x+210+(i*61)%240,py=y+260+(i*97)%350;g.fillStyle(i%2?0x397e70:0x4b9a85,.8);g.fillCircle(px,py,5);g.fillStyle(0x9be0bd,.8);g.fillCircle(px+2,py-2,2)}
}
function drawViridian(s){
 const g=s.add.graphics(),x=3800,y=80,w=1500,h=960;g.fillStyle(0x4b925b,1);g.fillRect(x,y,w,h);
 for(let yy=y;yy<y+h;yy+=52)for(let xx=x;xx<x+w;xx+=52){g.fillStyle(((xx+yy)/52)%2?0x4c965c:0x478b55,1);g.fillRect(xx,yy,50,50)}
 g.fillStyle(0xc9b58d,1);g.fillRect(x,y+420,w,120);g.fillRect(x+690,y,130,960);
 g.fillStyle(0xead9b3,1);for(let xx=x;xx<x+w;xx+=48)g.fillRect(xx,y+475,28,4);for(let yy=y;yy<y+h;yy+=42)g.fillRect(x+750,yy,4,25);
 [[x+60,y+170,.9],[x+380,y+165,.85],[x+1280,y+170,1.05],[x+1350,y+610,.9],[x+80,y+770,.95],[x+760,y+830,.85]].forEach(([tx,ty,sc])=>addDepthTree(s,tx,ty,sc));
 const house=(hx,hy,col)=>{g.fillStyle(0x4b4140,1);g.fillRect(hx,hy+35,190,115);g.fillStyle(col,1);g.fillTriangle(hx-15,hy+40,hx+95,hy-35,hx+205,hy+40);g.fillStyle(0xe4d2ad,1);g.fillRect(hx+75,hy+82,40,68);g.fillStyle(0x77b5cb,1);g.fillRect(hx+20,hy+65,35,32);g.fillRect(hx+135,hy+65,35,32)};
 house(x+160,y+150,0x9c5d58);house(x+1100,y+150,0x527da5);house(x+160,y+680,0x98744f);
 g.fillStyle(0x343d4d,1);g.fillRect(x+850,y+230,310,245);g.fillStyle(0x587c57,1);g.fillTriangle(x+820,y+245,x+1005,y+105,x+1190,y+245);g.fillStyle(0xe5d4a8,1);g.fillRect(x+965,y+340,82,135);g.fillStyle(0x9bd16b,1);g.fillCircle(x+1005,y+285,30);g.lineStyle(5,0xe4d9ad,1);g.strokeCircle(x+1005,y+285,30);
 g.fillStyle(0x2d6844,1);g.fillRoundedRect(x+30,y+280,300,230,28);for(let i=0;i<45;i++){g.fillStyle(i%2?0xf2d57c:0xe9a6b0,1);g.fillCircle(x+55+(i*47)%245,y+300+(i*31)%180,4)}
 s.add.text(x+95,y+70,'THÀNH PHỐ VIRIDIAN',{fontFamily:'monospace',fontSize:'25px',color:'#fff3cf',stroke:'#24442d',strokeThickness:6});s.add.text(x+865,y+495,'NHÀ THI ĐẤU VIRIDIAN',{fontFamily:'monospace',fontSize:'16px',color:'#fff',stroke:'#263d2a',strokeThickness:5});
 const grass=(gx,gy,gw,gh)=>{grassAreas.push({x:gx,y:gy,w:gw,h:gh});for(let yy=gy;yy<gy+gh;yy+=13)for(let xx=gx;xx<gx+gw;xx+=13){g.fillStyle(0x267444,1);g.fillRect(xx,yy,11,11);g.fillStyle(0x9bcf65,1);g.fillTriangle(xx+1,yy+10,xx+5,yy-2,xx+7,yy+10)}};
 grass(x+340,y+640,330,220);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(x+w/2,y+8,w,16);wall(x+8,y+h/2,16,h);wall(x+w-8,y+h/2,16,h);wall(x+w/2,y+h-8,w,16);
}
function createPlayer(s,x,y){
 player=s.add.container(x,y);
 const shadow=s.add.ellipse(0,25,31,10,0x173d2a,.42);
 const legs=s.add.container(0,0);
 const legL=s.add.rectangle(-6,17,9,17,0x24334b).setOrigin(.5,0);
 const legR=s.add.rectangle(6,17,9,17,0x24334b).setOrigin(.5,0);
 const bootL=s.add.rectangle(-6,31,12,6,0x302a2b),bootR=s.add.rectangle(6,31,12,6,0x302a2b);
 legs.add([legL,legR,bootL,bootR]);
 const body=s.add.container(0,0);
 const pack=s.add.rectangle(-14,1,8,19,0x9b4938).setStrokeStyle(2,0x542e2b);
 const coat=s.add.rectangle(0,2,23,25,0x294d91).setStrokeStyle(2,0x172a52);
 const scarf=s.add.rectangle(0,-4,13,4,0xf1c64f);
 const neck=s.add.rectangle(0,-13,8,6,0xe8b58f);
 const face=s.add.rectangle(0,-22,19,18,0xf1c49e).setStrokeStyle(2,0x704a3b);
 const hair=s.add.rectangle(0,-31,21,7,0x342a2a);
 const cap=s.add.rectangle(0,-35,27,7,0xc94442).setStrokeStyle(2,0x762d32);
 const brim=s.add.rectangle(7,-31,18,3,0xe45a4d);
 const eyes=s.add.rectangle(4,-22,3,3,0x202a39);
 body.add([pack,coat,scarf,neck,face,hair,cap,brim,eyes]);
 player.add([shadow,legs,body]);player.setDepth(y);
 player.walkParts={legs,legL,legR,body,shadow,bootL,bootR};
 s.physics.add.existing(player);player.body.setSize(20,25);player.body.setOffset(-10,5);player.body.setCollideWorldBounds(true);player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(15,15,7080,1370));
 s.tweens.add({targets:body,y:-1,duration:390,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
 s.cameras.main.setBounds(0,0,5400,1100);s.cameras.main.startFollow(player,true,.12,.12);return player
}
let companion=null,companionArt=null,companionName='';
function setCompanionMon(){
 if(!scene||!companion||!state.party.length)return;
 const mon=state.party[0],name=mon.name,emoji=mon.emoji||'🐾';
 if(companionName===name&&companionArt)return;
 companionName=name;
 if(companionArt){companionArt.destroy();companionArt=null}
 const key='dk-follow-'+name.toLowerCase().replace(/[^a-z0-9]/g,'');
 const sheet=spriteSheetFor(name)?.replace('-idle.svg','-move.svg')||null,animKey=key+'-move';
 if(sheet){
  const mount=()=>{
   if(!companion||!companion.active||companionName!==name)return;
   if(companionArt)companionArt.destroy();
   if(!scene.anims.exists(animKey))scene.anims.create({key:animKey,frames:scene.anims.generateFrameNumbers(key,{start:0,end:3}),frameRate:8,repeat:-1});
   const sprite=scene.add.sprite(0,-5,key,0).setDisplaySize(42,42);
   companion.add(sprite);companionArt=sprite;sprite.play(animKey);sprite.anims.timeScale=.72;
  };
  if(scene.textures.exists(key)){mount();return}
  scene.load.spritesheet(key,sheet,{frameWidth:128,frameHeight:128});
  scene.load.once('filecomplete-spritesheet-'+key,mount);
  scene.load.start();return;
 }
 const fallback=scene.add.text(0,-5,emoji,{fontSize:'27px'}).setOrigin(.5);
 companion.add(fallback);companionArt=fallback;
 const src=spriteFor(name);if(!src)return;
 if(scene.textures.exists(key)){fallback.destroy();const img=scene.add.image(0,-5,key).setDisplaySize(42,42);companion.add(img);companionArt=img;return}
 scene.load.image(key,src);
 scene.load.once('filecomplete-image-'+key,()=>{
  if(!companion||!companion.active||companionName!==name)return;
  if(companionArt)companionArt.destroy();
  const img=scene.add.image(0,-5,key).setDisplaySize(42,42);
  companion.add(img);companionArt=img;
 });
 scene.load.start();
}
function createCompanion(s){
 companion=s.add.container(player.x-34,player.y+12);
 const shade=s.add.ellipse(0,15,27,8,0x10251c,.42);
 companion.add(shade);companion.setDepth(player.y+1);
 companion.setAlpha(.98);
 setCompanionMon();
}
function updateCompanion(vx,vy,running){
 if(!companion||!player||!companion.active)return;
 if(state.party.length&&companionName!==state.party[0].name)setCompanionMon();
 const moving=!!(vx||vy),dx=moving?vx*34:(player.walkParts&&player.walkParts.body.scaleX<0?34:-34);
 const dy=moving?(vy>0?-17:vy<0?24:12):12;
 const tx=player.x-dx,ty=player.y+dy;
 companion.x=Phaser.Math.Linear(companion.x,tx,.16);
 companion.y=Phaser.Math.Linear(companion.y,ty,.16);
 if(companionArt){
  const phase=Date.now()/(running?62:moving?95:420);
  if(companionArt.anims&&companionArt.anims.currentAnim)companionArt.anims.timeScale=running?1.8:moving?1.15:.72;
  if(companionArt.setAngle)companionArt.setAngle(moving?Math.sin(phase)*(running?8:4):0);
  if(companionArt.setScale)companionArt.setScale(1+(moving?Math.abs(Math.sin(phase))*(running?.10:.045):0));
  companionArt.y=-5+(moving?Math.abs(Math.sin(phase))*(running?5:2):Math.sin(phase)*1.5);
 }
 companion.setDepth(player.y+1);
}
let lastWorldEvent=0;
let ambientWildlife=[];
function addAmbientWildlife(s){
 ambientWildlife=[];
 const looks=[['🐛','Caterpie','shy'],['🐦','Pidgey','shy'],['🐀','Rattata','bold'],['🌱','Oddish','shy'],['🦆','Psyduck','calm'],['🦇','Zubat','bold'],['🪨','Geodude','bold'],['🌿','Bellsprout','shy'],['🐚','Seel','calm']];
 const patches=grassAreas.filter(a=>a.w>90&&a.h>90);
 if(!patches.length)return;
 const count=Math.min(9,patches.length*2+1);
 for(let i=0;i<count;i++){
  const a=patches[i%patches.length],look=looks[(i*3+Math.floor(Math.random()*looks.length))%looks.length];
  const x=a.x+28+Math.random()*Math.max(10,a.w-56),y=a.y+28+Math.random()*Math.max(10,a.h-56);
  const shadow=s.add.ellipse(x,y+12,19,6,0x10291b,.38).setDepth(y-1);
  const sprite=s.add.text(x,y,look[0],{fontSize:'23px'}).setOrigin(.5).setDepth(y+1);
  sprite.setData('species',look[1]);
  s.tweens.add({targets:sprite,y:y-3,duration:550+Math.random()*450,yoyo:true,repeat:-1,ease:'Sine.easeInOut',delay:Math.random()*500});
  ambientWildlife.push({sprite,shadow,mon:look[1],temper:look[2],area:a,x,y,homeX:x,homeY:y,vx:0,vy:0,mode:'idle',thinkAt:0,alive:true});
 }
}
function beginWildEncounter(w){
 if(!w||!w.alive||busy)return;
 w.alive=false;busy=true;stopMove();
 const cam=scene&&scene.cameras?scene.cameras.main:null;
 if(cam)cam.shake(180,.0025);
 const targetX=player.x+(w.x<player.x?-34:34),targetY=player.y-12;
 scene.tweens.add({targets:w.sprite,x:targetX,y:targetY,scale:1.5,angle:w.x<player.x?18:-18,duration:300,ease:'Back.easeOut',onComplete:()=>{
  if(w.sprite&&w.sprite.active){w.sprite.setAlpha(0);w.sprite.setScale(1);w.sprite.setAngle(0)}
  if(w.shadow&&w.shadow.active)w.shadow.setAlpha(0);
  if(cam)cam.flash(140,255,245,205);
  busy=false;
  startBattle({kind:'wild',mon:w.mon,actor:w});
 }});
}
function updateAmbientWildlife(delta){
 if(!player||!ambientWildlife.length)return;
 const dt=Math.min(40,delta||16)/1000;
 for(const w of ambientWildlife){
  if(!w.alive||!w.sprite.active)continue;
  const dx=player.x-w.x,dy=player.y-w.y,dist=Math.hypot(dx,dy);
  if(!busy&&dist<46){beginWildEncounter(w);return}
  if(!busy&&dist<155&&w.temper==='bold'){w.mode='chase'}
  else if(!busy&&dist<125&&w.temper==='shy'){w.mode='flee'}
  else if(dist>230&&w.mode!=='idle'){w.mode='return'}
  if(Date.now()>w.thinkAt&&w.mode==='idle'){
   const tx=Phaser.Math.Clamp(w.homeX+(Math.random()-.5)*Math.min(100,w.area.w*.5),w.area.x+18,w.area.x+w.area.w-18);
   const ty=Phaser.Math.Clamp(w.homeY+(Math.random()-.5)*Math.min(80,w.area.h*.45),w.area.y+18,w.area.y+w.area.h-18);
   const len=Math.hypot(tx-w.x,ty-w.y)||1;w.vx=(tx-w.x)/len;w.vy=(ty-w.y)/len;w.thinkAt=Date.now()+1300+Math.random()*1800;w.goalX=tx;w.goalY=ty;
  }
  if(w.mode==='chase'||w.mode==='flee'||w.mode==='return'){
   let tx=w.mode==='chase'?player.x:w.mode==='flee'?w.x-dx*2.5:w.homeX;
   let ty=w.mode==='chase'?player.y:w.mode==='flee'?w.y-dy*2.5:w.homeY;
   const len=Math.hypot(tx-w.x,ty-w.y)||1;w.vx=(tx-w.x)/len;w.vy=(ty-w.y)/len;
   if(w.mode==='return'&&len<18){w.mode='idle';w.thinkAt=Date.now()+800}
  }
  if(w.mode==='idle'&&w.goalX!==undefined){const gx=w.goalX-w.x,gy=w.goalY-w.y;if(Math.hypot(gx,gy)<7){w.vx=0;w.vy=0;w.goalX=undefined;w.thinkAt=Date.now()+700+Math.random()*1200}}
  const speed=w.mode==='chase'?48:w.mode==='flee'?82:w.mode==='return'?42:18;
  const nx=w.x+w.vx*speed*dt,ny=w.y+w.vy*speed*dt;
  if(w.mode==='idle'||w.mode==='return'){w.x=Phaser.Math.Clamp(nx,w.area.x+14,w.area.x+w.area.w-14);w.y=Phaser.Math.Clamp(ny,w.area.y+14,w.area.y+w.area.h-14)}
  else{w.x=nx;w.y=ny}
  w.sprite.setPosition(w.x,w.y);w.sprite.setDepth(w.y+1);w.shadow.setPosition(w.x,w.y+12);w.shadow.setDepth(w.y-1);
  w.sprite.setScale(w.mode==='chase'||w.mode==='flee'?1.12:1);
  if(w.mode==='flee'&&(dist>270||!w.area||w.x<w.area.x-60||w.x>w.area.x+w.area.w+60||w.y<w.area.y-60||w.y>w.area.y+w.area.h+60)){w.x=w.homeX;w.y=w.homeY;w.mode='idle';w.thinkAt=Date.now()+1800}
  if(w.mode==='chase'&&dist>260)w.mode='return';
 }
}
function triggerWorldEvent(){
 if(!player||busy||Date.now()-lastWorldEvent<90000)return false;
 if(!inGrass(player.x,player.y))return false;
 const events=[
  {title:'BỤI CỎ LẤP LÁNH',desc:'Bạn phát hiện một túi tiền nhỏ bị bỏ quên giữa đám cỏ.',reward:'45 vàng',claim:()=>state.gold+=45},
  {title:'QUẢ MỌNG HIẾM',desc:'Một bụi cây có quả mọng chín. Bạn hái được thuốc hồi phục tự nhiên.',reward:'+1 thuốc hồi phục',claim:()=>state.potions++},
  {title:'BÓNG POKÉ THẤT LẠC',desc:'Một Nhà Huấn Luyện nào đó đã đánh rơi bóng Poké.',reward:'+2 bóng Poké',claim:()=>state.balls+=2},
  {title:'DẤU CHÂN BÍ ẨN',desc:'Bạn tìm thấy một vật phẩm và chút tiền xu dưới tán cỏ.',reward:'+25 vàng và +1 thuốc',claim:()=>{state.gold+=25;state.potions++}}
 ];
 const e=events[Math.floor(Math.random()*events.length)];
 lastWorldEvent=Date.now();state.lastWorldEvent=lastWorldEvent;stopMove();busy=true;
 panel(e.title,'SỰ KIỆN KHÁM PHÁ BẤT NGỜ','<p>'+e.desc+'</p><p class="event-reward">🎁 PHẦN THƯỞNG: '+e.reward+'</p><button class="primary" id="claimWorldEvent">NHẬN VẬT PHẨM</button>');
 $('claimWorldEvent').onclick=()=>{e.claim();busy=false;save();hud();hide('panel');sound('catch');toast('Đã nhận '+e.reward+'!')};
 return true;
}
function createGame(){if(!window.Phaser){toast('Không tải được thư viện game. Kiểm tra Internet rồi tải lại.');return}const config={type:Phaser.AUTO,parent:'game',backgroundColor:'#438c59',scale:{mode:Phaser.Scale.RESIZE,width:900,height:560},pixelArt:true,physics:{default:'arcade',arcade:{debug:false}},scene:{create(){scene=this;grassAreas=[];drawWorld(this);const oak=addNpc(this,300,340,'🧑‍🔬','GIÁO SƯ OAK');const fisher=addNpc(this,1020,735,'🎣','NGƯỜI CÂU CÁ');const trainers=[{id:'route-ace',x:540,y:500,emoji:'🧢',label:'HUẤN LUYỆN VIÊN MINH',mon:'Rattata',level:5,reward:90},{id:'forest-ace',x:390,y:760,emoji:'🥾',label:'NHÀ THÁM HIỂM LAN',mon:'Caterpie',level:7,reward:130},{id:'cave-ace',x:650,y:900,emoji:'⛏️',label:'THỢ MỎ NAM',mon:'Geodude',level:9,reward:180}];trainers.forEach(t=>{t.obj=addNpc(this,t.x,t.y,t.emoji,state.trainersDefeated.includes(t.id)?'ĐÃ THÁCH ĐẤU':t.label)});const shopDoor=addNpc(this,230,390,'🚪','CỬA HÀNG PALLET');const centerDoor=addNpc(this,520,390,'🏥','TRUNG TÂM POKÉMON');
createPlayer(this,330,390);createCompanion(this);createWorldClock(this);this.physics.world.setBounds(0,0,7100,1400);player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(15,15,7080,1370));
drawInterior(this,1650,120,600,700,'CỬA HÀNG PALLET',0xe5b65b);drawInterior(this,2300,120,500,700,'TRUNG TÂM POKÉMON',0x71d5c2);drawCaveInterior(this);drawViridian(this);drawSeaIsland(this);addAmbientWildlife(this);lastWorldEvent=Number(state.lastWorldEvent)||0;
const islandBoat=addNpc(this,5850,760,'⛵','THUYỀN VỀ VIRIDIAN');const captain=addNpc(this,5050,830,'⛵','THUYỀN TRƯỞNG');const islandGuide=addNpc(this,6250,450,'🧭','NGƯỜI GIỮ ĐẢO');const shell1=addNpc(this,5940,250,'🐚','NGỌC TRAI 1');const shell2=addNpc(this,6500,720,'🐚','NGỌC TRAI 2');const shell3=addNpc(this,6800,300,'🐚','NGỌC TRAI 3');
const researcher=addNpc(this,3440,480,'🧑‍🔬','NHÀ NGHIÊN CỨU');const crystalA=addNpc(this,3160,300,'💎','TINH THỂ CỔ 1');const crystalB=addNpc(this,3450,650,'💎','TINH THỂ CỔ 2');const crystalC=addNpc(this,3550,330,'💎','TINH THỂ CỔ 3');
const shopkeeper=addNpc(this,1950,420,'🧑‍💼','CHỦ CỬA HÀNG');const shopExit=addNpc(this,1950,770,'🚪','CỬA RA THỊ TRẤN');const nurse=addNpc(this,2550,420,'👩‍⚕️','Y TÁ JOY');const centerExit=addNpc(this,2550,770,'🚪','CỬA RA THỊ TRẤN');const caveGate=addNpc(this,500,955,'🕳️','LỐI VÀO HANG SÂU');const caveExit=addNpc(this,3325,850,'🚪','RA KHỎI HANG');const cityGate=addNpc(this,1390,500,'🏙️','CỔNG THÀNH PHỐ VIRIDIAN');const cityExit=addNpc(this,4550,990,'🚪','CỔNG VỀ ĐƯỜNG 1');const viridianGym=addNpc(this,4805,430,'🏟️','NHÀ THI ĐẤU VIRIDIAN');const cityGuide=addNpc(this,4200,520,'🧑‍🌾','NGƯỜI DẪN ĐƯỜNG');
this.npcs=[oak,fisher,...trainers,islandBoat,captain,islandGuide,shell1,shell2,shell3,researcher,crystalA,crystalB,crystalC,shopDoor,centerDoor,shopkeeper,shopExit,nurse,centerExit,caveGate,caveExit,cityGate,cityExit,viridianGym,cityGuide];this.trainers=trainers;
const solids=[[227,282,150,70],[447,282,150,70],[947,262,150,70],[1225,805,330,250],[700,40,90,80]];solids.forEach(v=>{const wall=this.add.rectangle(v[0],v[1],v[2],v[3],0xffffff,0);this.physics.add.existing(wall,true);this.physics.add.collider(player,wall)});this.add.text(20,1010,'Di chuyển bằng phím hoặc cụm nút cảm ứng',{fontSize:'12px',color:'#fff',stroke:'#1a3c2c',strokeThickness:4});},update(time,delta){updateAmbientWildlife(delta);if(!player||busy)return;let vx=0,vy=0;const running=sprintHeld||keys.Shift;const speed=rideActive?330:running?245:155;if(keys.left||keys.a||keys.ArrowLeft)vx=-1;if(keys.right||keys.d||keys.ArrowRight)vx=1;if(keys.up||keys.w||keys.ArrowUp)vy=-1;if(keys.down||keys.s||keys.ArrowDown)vy=1;if(heldDir){if(heldDir==='left')vx=-1;if(heldDir==='right')vx=1;if(heldDir==='up')vy=-1;if(heldDir==='down')vy=1}if(vx&&vy){vx*=.707;vy*=.707}player.body.setVelocity(vx*speed,vy*speed);if(player.walkParts){const w=player.walkParts;const walking=!!(vx||vy),phase=Date.now()/(running?48:85);w.legL.rotation=walking?Math.sin(phase)*.34:0;w.legR.rotation=walking?-Math.sin(phase)*.34:0;w.bootL.rotation=w.legL.rotation*.55;w.bootR.rotation=w.legR.rotation*.55;w.body.y=walking?Math.abs(Math.sin(phase))*(running?3.2:1.25):Math.sin(Date.now()/520)*.45;w.body.x=walking?Math.sin(Date.now()/(running?55:90))*(running?2.5:1.35):0;w.body.rotation=walking?Math.sin(phase*2)*(running?.035:.018):Math.sin(Date.now()/650)*.012;w.legL.y=walking?Math.max(0,Math.sin(phase))*-1.5:0;w.legR.y=walking?Math.max(0,-Math.sin(phase))*-1.5:0;w.bootL.x=-6+(walking?Math.sin(phase)*2.5:0);w.bootR.x=6-(walking?Math.sin(phase)*2.5:0);if(vx<0)w.body.scaleX=-1;else if(vx>0)w.body.scaleX=1;}updateCompanion(vx,vy,running);if(vx||vy){state.steps++;if(state.steps%18===0){save();const dust=scene.add.circle(player.x+(Math.random()-.5)*9,player.y+20,2+Math.random()*2,0xe4d5b0,.48).setDepth(player.y-2);scene.tweens.add({targets:dust,x:dust.x+(Math.random()-.5)*18,y:dust.y-8,alpha:0,scale:1.8,duration:360,onComplete:()=>dust.destroy()});if(inGrass(player.x,player.y)&&Date.now()-lastEncounter>5000&&Math.random()<.18)startBattle();else if(Math.random()<.045)triggerWorldEvent()}}updateLocation();syncQuestMarkers();}}};game=new Phaser.Game(config);game.events.once('ready',()=>{});}
let rideActive=false,rideBadge=null;
function toggleRide(){if(!state.rideUnlocked){toast('Hoàn thành nhiệm vụ Đảo San Hô để mở khóa cưỡi Lapras!');return}if(!player||busy)return;rideActive=!rideActive;if(rideActive){if(!rideBadge){rideBadge=scene.add.text(0,23,'🌊',{fontSize:'30px'}).setOrigin(.5);player.addAt(rideBadge,0)}rideBadge.setVisible(true);$('ride').textContent='🌊 XUỐNG KHỎI LAPRAS';toast('Lapras đưa bạn lướt đi! Tốc độ tăng lên.')}else{if(rideBadge)rideBadge.setVisible(false);$('ride').textContent='🌊 CƯỠI LAPRAS';toast('Bạn đã xuống khỏi Lapras.')}};
function drawSeaIsland(s){
 const g=s.add.graphics(),x=5500,y=0,w=1600,h=1400;
 g.fillStyle(0x287eaa,1);g.fillRect(x,y,w,h);
 for(let i=0;i<150;i++){const px=x+((i*173)%w),py=(i*97)%h;g.fillStyle(i%2?0x4ba4c4:0x1e6e9d,.45);g.fillEllipse(px,py,35,9)}
 g.fillStyle(0xd9c58e,1);g.fillEllipse(6300,700,1180,820);g.fillStyle(0x72a95d,1);g.fillEllipse(6300,680,1040,700);g.fillStyle(0x4f8d50,1);g.fillEllipse(6300,680,870,570);
 for(let i=0;i<22;i++){const px=5850+(i*137)%900,py=420+(i*83)%520;g.fillStyle(0x326b43,1);g.fillCircle(px,py,18);g.fillStyle(0x5b9d5c,1);g.fillCircle(px-7,py-8,13)}
 g.fillStyle(0xc5a36c,1);g.fillRect(6110,920,370,38);g.fillStyle(0x72523c,1);g.fillRect(6280,880,30,80);g.fillStyle(0xf1e0b7,1);g.fillTriangle(6295,875,6295,810,6355,875);
 s.add.text(6300,180,'ĐẢO SAN HÔ',{fontFamily:'monospace',fontSize:'26px',color:'#fff3cf',stroke:'#31536a',strokeThickness:6}).setOrigin(.5);
 const wall=(cx,cy,cw,ch)=>{const o=s.add.rectangle(cx,cy,cw,ch,0xffffff,0);s.physics.add.existing(o,true);s.physics.add.collider(player,o)};
 wall(6300,18,1600,30);wall(6300,1380,1600,30);wall(5518,700,30,1400);wall(7082,700,30,1400);
 grassAreas.push({x:6000,y:480,w:620,h:400});
}
function createWorldClock(s){
 const shade=s.add.rectangle(0,0,900,560,0x08152f,0).setOrigin(0).setScrollFactor(0).setDepth(99990);
 const label=s.add.text(12,34,'09:00 · TRỜI QUANG',{fontFamily:'monospace',fontSize:'11px',color:'#fff7d6',backgroundColor:'#102b3dcc',padding:{x:7,y:5}}).setScrollFactor(0).setDepth(99991);
 const rain=[];for(let i=0;i<34;i++){const line=s.add.rectangle(Math.random()*900,Math.random()*560,1.5,12,0xb9e8ff,.55).setScrollFactor(0).setDepth(99989);rain.push(line)}
 const caveMist=[];for(let i=0;i<14;i++){const puff=s.add.ellipse(Math.random()*900,Math.random()*560,20+Math.random()*24,5+Math.random()*5,0x9ad8d0,.0).setScrollFactor(0).setDepth(99986);caveMist.push(puff);s.tweens.add({targets:puff,x:puff.x+65,alpha:.22,duration:3600+Math.random()*1800,yoyo:true,repeat:-1,delay:Math.random()*1800,ease:'Sine.easeInOut'})}
 const seaGlints=[];for(let i=0;i<18;i++){const glint=s.add.ellipse(Math.random()*900,Math.random()*560,7,2,0xc4f5ff,.0).setScrollFactor(0).setDepth(99985);seaGlints.push(glint);s.tweens.add({targets:glint,alpha:.8,scaleX:1.7,duration:700+Math.random()*800,yoyo:true,repeat:-1,delay:Math.random()*1200,ease:'Sine.easeInOut'})}
 const fireflies=[];for(let i=0;i<18;i++){const dot=s.add.circle(Math.random()*900,Math.random()*560,1.5+Math.random()*1.5,0xc9ff9b,.0).setScrollFactor(0).setDepth(99988);fireflies.push(dot);s.tweens.add({targets:dot,alpha:.85,y:dot.y-12,duration:900+Math.random()*1300,yoyo:true,repeat:-1,delay:Math.random()*1500,ease:'Sine.easeInOut'})}
 const leafMotes=[];for(let i=0;i<12;i++){const leaf=s.add.ellipse(Math.random()*900,Math.random()*560,5,2,0xb6df83,.0).setScrollFactor(0).setDepth(99987);leafMotes.push(leaf);s.tweens.add({targets:leaf,alpha:.5,angle:360,x:leaf.x+45,y:leaf.y+24,duration:4200+Math.random()*2400,repeat:-1,delay:Math.random()*3000,ease:'Sine.easeInOut'})}
 const refresh=()=>{const mins=state.worldMinutes%1440,h=Math.floor(mins/60),m=mins%60;const night=h<6||h>=19,dusk=h>=17&&h<19||h>=6&&h<7;shade.setFillStyle(night?0x07152f:0x13243c);shade.setAlpha(night?.42:dusk?.18:.02);label.setText(String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+' · '+(night?'BAN ĐÊM':dusk?'HOÀNG HÔN':'BAN NGÀY')+(state.weather==='storm'?' · GIÔNG BÃO':state.weather==='rain'?' · MƯA':state.weather==='fog'?' · SƯƠNG MÙ':' · TRỜI QUANG'));const zone=state.zone||'route',openAir=['route','forest','lake','viridian','island','pallet'].includes(zone);rain.forEach(p=>p.setVisible((state.weather==='rain'||state.weather==='storm')&&!night&&openAir));fireflies.forEach(p=>p.setVisible(night&&state.weather!=='rain'&&(zone==='forest'||zone==='route'||zone==='island')));leafMotes.forEach(p=>p.setVisible(!night&&(zone==='forest'||zone==='viridian'||zone==='pallet')));caveMist.forEach(p=>p.setVisible(zone==='cave'||zone==='caveInterior'||(state.weather==='fog'&&(zone==='forest'||zone==='lake'))));seaGlints.forEach(p=>p.setVisible(zone==='island'||zone==='lake'));};
 s.scale.on('resize',(size)=>{shade.setSize(size.width,size.height);});
 s.events.on('update',()=>{const zone=state.zone||'route';const openAir=['route','forest','lake','viridian','island','pallet'].includes(zone);if((state.weather==='rain'||state.weather==='storm')&&openAir)rain.forEach(p=>{p.y+=state.weather==='storm'?8:zone==='island'?6:5;if(p.y>600){p.y=-12;p.x=Math.random()*1000}})});

 s.time.addEvent({delay:60000,loop:true,callback:()=>{state.worldMinutes=(state.worldMinutes+30)%1440;if(Math.random()<.22){const roll=Math.random();state.weather=roll<.52?'clear':roll<.82?'rain':roll<.92?'storm':'fog';}refresh();save()}});
 state.weather=['rain','storm','fog'].includes(state.weather)?state.weather:'clear';refresh();
}
function typeEffect(attacker,defender){const a=String(attacker||''),d=String(defender||'');let mult=1;const has=(s,k)=>s.includes(k);if((has(a,'Lửa')&&(has(d,'Cỏ')||has(d,'Côn trùng'))) || (has(a,'Nước')&&has(d,'Lửa')) || (has(a,'Cỏ')&&has(d,'Nước')) || (has(a,'Đá')&&(has(d,'Bay')||has(d,'Lửa'))))mult=1.5;else if((has(a,'Lửa')&&has(d,'Nước'))||(has(a,'Nước')&&has(d,'Cỏ'))||(has(a,'Cỏ')&&has(d,'Lửa'))||(has(a,'Thường')&&has(d,'Đá')))mult=.7;return {multiplier:mult}}
function inGrass(x,y){return grassAreas.some(a=>x>=a.x&&x<=a.x+a.w&&y>=a.y&&y<=a.y+a.h)}
function updateLocation(){if(!player)return;let z='route';if(player.x>=5500&&player.x<7100)z='island';else if(player.x>=3800&&player.x<5300)z='viridian';else if(player.x>=3000&&player.x<3700)z='caveInterior';else if(player.x>=2300)z='center';else if(player.x>=1600)z='shop';else if(player.x<680&&player.y<440)z='pallet';else if(player.x>485&&player.x<650&&player.y>805)z='cave';else if(player.x<650&&player.y>560)z='forest';else if(player.x>1030&&player.y>660)z='lake';if(z!==state.zone){setZone(z);if(z==='forest'&&state.quest===3){setQuest(4);toast('Đã khám phá Rừng Thanh Mộc!')}if(z==='lake'&&state.quest===4){setQuest(5);toast('Đã đến Hồ Xanh! Hãy trò chuyện với người câu cá.')}}}

function stopMove(){heldDir=null;sprintHeld=false;const b=$('sprint');if(b)b.classList.remove('active')}
function startBattle(mode=false){const gym=mode&&typeof mode==='object'&&mode.kind==='gym'?mode:null;const wildEncounter=mode&&typeof mode==='object'&&mode.kind==='wild'?mode:null;const isGym=mode===true||!!gym;const trainer=mode&&typeof mode==='object'&&!gym&&!wildEncounter?mode:null;if(busy||!state.party.length)return;if(isGym&&state.badges.includes(gym?gym.badge:'Đá'))return toast('Bạn đã sở hữu huy hiệu '+(gym?gym.badge:'Đá')+'!');if(trainer&&state.trainersDefeated.includes(trainer.id))return toast('Bạn đã thắng huấn luyện viên này rồi!');lastEncounter=Date.now();busy=true;const zone=state.zone==='forest'?'forest':state.zone==='lake'?'lake':state.zone==='cave'||state.zone==='caveInterior'?'cave':state.zone==='viridian'?'viridian':state.zone==='island'?'island':'route';const pool=wildByZone[zone]||wildByZone.route;const name=isGym?'Geodude':trainer?trainer.mon:wildEncounter?wildEncounter.mon:pool[Math.floor(Math.random()*pool.length)];const wild=makeMon(name,isGym?(gym?gym.level:10):trainer?trainer.level:2+Math.floor(Math.random()*4));if(trainer){wild.name=trainer.mon;if(trainer.legendary){wild.maxHp=wild.hp=trainer.hp||150;wild.current=wild.maxHp;wild.atk=trainer.atk||25;wild.def=trainer.def||18;wild.type='Tâm linh';}}if(isGym){wild.name=gym?gym.boss:'Thủ Lĩnh Đá';wild.emoji=gym?gym.emoji:'🗿';wild.maxHp=wild.hp=gym?gym.hp:95;wild.current=wild.maxHp;wild.atk=gym?gym.atk:14;wild.def=gym?gym.def:8;wild.type=gym?gym.type:'Đá/Đất';}wild.current=wild.maxHp;let ended=false,turn=false;$('enemyName').textContent=wild.name;$('enemyLv').textContent='Lv. '+wild.level;setMonArt('enemyEmoji',wild.name,wild.emoji);$('allyName').textContent=state.party[0].name;$('allyLv').textContent='Lv. '+state.party[0].level;setMonArt('allyEmoji',state.party[0].name,state.party[0].emoji);$('enemyHp').style.width='100%';$('allyHp').style.width=(state.party[0].current/state.party[0].maxHp*100)+'%';$('battleText').textContent='Một '+wild.name+' hoang dã nhảy ra từ bụi cỏ!';$('battleWeather').textContent=isGym?'NHÀ THI ĐẤU ĐÁ':trainer?'ĐẤU HUẤN LUYỆN VIÊN':zone==='forest'?'RỪNG THANH MỘC':zone==='lake'?'HỒ XANH':(zone==='cave'||zone==='caveInterior')?'HANG ĐÁ THẠCH ANH':zone==='viridian'?'THÀNH PHỐ VIRIDIAN':'ĐƯỜNG 1';show('battle');$('battle').classList.remove('battle-intro');void $('battle').offsetWidth;$('battle').classList.add('battle-intro');setTimeout(()=>$('battle').classList.remove('battle-intro'),850);
 const movesEl=$('battle').querySelector('.moves');
 movesEl.insertAdjacentHTML('beforeend','<button id="switchMon" class="battle-extra">🔄 ĐỔI POKÉMON</button><button id="battlePotion" class="battle-extra">🧪 DÙNG THUỐC ('+state.potions+')</button>');
 const refreshLead=()=>{const lead=state.party[0];$('allyName').textContent=lead.name;$('allyLv').textContent='Lv. '+lead.level;setMonArt('allyEmoji',lead.name,lead.emoji);$('allyHp').style.width=(lead.current/lead.maxHp*100)+'%'};
 const battleStatuses={ally:null,enemy:null};
 const ensureStatusBadges=()=>{[['ally','.battlemon.ally'],['enemy','.battlemon.enemy']].forEach(([side,selector])=>{const host=$('battle').querySelector(selector);if(host&&!host.querySelector('#'+side+'Status')){const badge=document.createElement('div');badge.className='battle-status';badge.id=side+'Status';host.appendChild(badge)}})};
 const paintStatus=side=>{const el=$(side+'Status'),s=battleStatuses[side];if(!el)return;el.textContent=s?battleStatusInfo[s.kind].icon+' '+battleStatusInfo[s.kind].label+' · '+s.turns+' lượt':'';el.dataset.status=s?s.kind:'';el.classList.toggle('active',!!s)};
 const applyStatus=(side,kind,chance=.38)=>{if(!battleStatusInfo[kind]||battleStatuses[side]||Math.random()>chance)return false;battleStatuses[side]={kind,turns:2};paintStatus(side);return true};
 const tickStatus=(side,mon,hpEl)=>{const s=battleStatuses[side];if(!s)return {skip:false,damage:0,message:''};let damage=0;if(battleStatusInfo[s.kind].dot){damage=Math.max(2,Math.floor(mon.maxHp*.055));mon.current=Math.max(1,mon.current-damage);if(hpEl)$(hpEl).style.width=(mon.current/mon.maxHp*100)+'%'}s.turns--;const message=(damage?' '+mon.name+' mất '+damage+' HP do '+battleStatusInfo[s.kind].label.toLowerCase()+'.':'') ;const skip=(s.kind==='freeze'||s.kind==='stun');if(s.turns<=0)battleStatuses[side]=null;paintStatus(side);return {skip,damage,message,kind:s.kind};};
 ensureStatusBadges();

 $('switchMon').onclick=()=>{if(ended||turn)return;const idx=state.party.findIndex((m,i)=>i>0&&m.current>0);if(idx<1){$('battleText').textContent='Không còn Pokémon khỏe mạnh để đổi!';return}const next=state.party.splice(idx,1)[0];state.party.push(state.party.shift());state.party.unshift(next);setCompanionMon();refreshLead();$('battleText').textContent='Bạn gọi '+next.name+' ra sân!';turn=true;save();setTimeout(enemyTurn,550)};
 $('battlePotion').onclick=()=>{if(ended||turn)return;const m=state.party[0];if(state.potions<1){$('battleText').textContent='Bạn đã hết thuốc hồi phục!';return}if(m.current>=m.maxHp){$('battleText').textContent=m.name+' đang đầy HP.';return}state.potions--;m.current=Math.min(m.maxHp,m.current+30);$('battlePotion').textContent='🧪 DÙNG THUỐC ('+state.potions+')';$('allyHp').style.width=(m.current/m.maxHp*100)+'%';$('battleText').textContent=m.name+' hồi phục 30 HP! Đối thủ có cơ hội phản công.';turn=true;save();hud();setTimeout(enemyTurn,550)};
 const end=()=>{if(ended)return;ended=true;hide('battle');busy=false;stopMove();if(wildEncounter&&wildEncounter.actor){const a=wildEncounter.actor;a.alive=false;if(a.sprite&&a.sprite.active)a.sprite.destroy();if(a.shadow&&a.shadow.active)a.shadow.destroy()}save();hud()};
 const enemyTurn=()=>{if(ended)return;const m=state.party[0];const statusTick=tickStatus('enemy',wild,'enemyHp');if(wild.current<=0){$('battleText').textContent=wild.name+' gục ngã do trạng thái!';sound('win');const reward=25+wild.level*8;state.gold+=reward;m.xp+=18;hud();setTimeout(end,1200);return}if(statusTick.skip){$('battleText').textContent=wild.name+(statusTick.kind==='freeze'?' bị đóng băng, không thể hành động!':' bị choáng và bỏ lỡ lượt!')+statusTick.message;turn=false;return}const enemyKind=moveVisualType(wild.type);const arena=$('battle').querySelector('.battlefield');setArenaEnvironment(arena,enemyKind);spawnElementalImpact(arena,enemyKind);$('enemyEmoji').classList.remove('enemy-lunge');void $('enemyEmoji').offsetWidth;$('enemyEmoji').classList.add('enemy-lunge');const dodgeChance=Math.min(.24,.10+(String(m.type).includes('Bay')?.09:String(m.type).includes('Nước')?.04:0));if(Math.random()<dodgeChance){sound('step');$('allyEmoji').classList.remove('dodge','hit-flash');void $('allyEmoji').offsetWidth;$('allyEmoji').classList.add('dodge');$('battleText').textContent=m.name+' né đòn trong gang tấc! Không nhận sát thương.';turn=false;return}sound('hit');$('allyEmoji').classList.remove('dodge','hit-flash');void $('allyEmoji').offsetWidth;$('allyEmoji').classList.add('hit-flash');const eff=typeEffect(wild.type,m.type);const dmg=Math.max(1,Math.floor((wild.atk-m.def)*eff.multiplier));m.current=Math.max(0,m.current-dmg);$('allyHp').style.width=(m.current/m.maxHp*100)+'%';const incomingStatus=String(wild.type).includes('Lửa')?'burn':String(wild.type).includes('Độc')?'poison':String(wild.type).includes('Băng')?'freeze':String(wild.type).includes('Tâm linh')?'stun':String(wild.type).includes('Đá')||String(wild.type).includes('Đất')?'bind':null;const gotStatus=m.current>0&&incomingStatus?applyStatus('ally',incomingStatus,.2):false;if(m.current<=0){$('battleText').textContent=m.name+' tạm thời kiệt sức! Được đưa về Trung tâm Pokémon.';m.current=m.maxHp;setTimeout(end,1500)}else{$('battleText').textContent=wild.name+' phản công, gây '+dmg+' sát thương!'+(gotStatus?' '+m.name+' bị '+battleStatusInfo[incomingStatus].label.toLowerCase()+'!':'')+(statusTick.message||'');turn=false}};
 const playerHit=(power,label,signature=null)=>{if(ended||turn)return;turn=true;const isSkill=label.includes('✨');const m=state.party[0];const playerTick=tickStatus('ally',m,'allyHp');if(playerTick.skip){$('battleText').textContent=m.name+(playerTick.kind==='freeze'?' bị đóng băng, mất lượt!':' bị choáng, mất lượt!')+playerTick.message;setTimeout(enemyTurn,450);return}const moveKind=moveVisualType(m.type);sound(isSkill?'special':moveKind==='normal'?'hit':moveKind);$('allyEmoji').classList.remove('attack-lunge','skill-strike','dodge','hit-flash');$('enemyEmoji').classList.remove('hit-flash');void $('allyEmoji').offsetWidth;void $('enemyEmoji').offsetWidth;$('allyEmoji').classList.add(isSkill?'skill-strike':'attack-lunge');$('enemyEmoji').classList.add('hit-flash');$('battle').dataset.move=moveKind;$('battle').dataset.action=isSkill?'skill':'attack';const arena=$('battle').querySelector('.battlefield');setArenaEnvironment(arena,moveKind);spawnElementalImpact(arena,moveKind);if(isSkill&&signature){$('battle').dataset.signature=signature.kind;spawnSignatureSkill(arena,signature);$('battleText').textContent=signature.description+'!';}const eff=typeEffect(m.type,wild.type);const critical=Math.random()<.08;const baseDamage=Math.max(2,power+Math.floor(Math.random()*4)-Math.floor(wild.def/2));const bindPenalty=battleStatuses.ally&&battleStatuses.ally.kind==='bind'?.78:1;const damage=Math.max(1,Math.floor(baseDamage*eff.multiplier*(critical?1.6:1)*bindPenalty));wild.current=Math.max(0,wild.current-damage);$('enemyHp').style.width=(wild.current/wild.maxHp*100)+'%';const statusKind=isSkill&&signature?signatureStatus[m.name]:null;const statusApplied=wild.current>0&&statusKind?applyStatus('enemy',statusKind,.42):false;$('battleText').textContent=label+' gây '+damage+' sát thương!'+(signature?' '+signature.description+'!':'')+(statusApplied?' '+wild.name+' bị '+battleStatusInfo[statusKind].label.toLowerCase()+'!':'')+(critical?' ĐÒN CHÍ MẠNG!':'')+(eff.multiplier>1?' Hiệu quả rất tốt!':eff.multiplier<1?' Không hiệu quả lắm...':'');if(wild.current<=0){sound('win');const reward=isGym?(gym?gym.reward:300):trainer?trainer.reward:25+wild.level*8;state.gold+=reward;m.xp+=trainer?30:isGym?40:18;if(m.xp>=40){m.xp-=40;m.level++;m.maxHp+=4;m.hp=m.maxHp;m.atk+=2;m.def+=1;m.current=m.maxHp;$('battleText').textContent=m.name+' lên cấp '+m.level+'! Nhận '+reward+' vàng.';if(evolution[m.name]&&m.level>=evolution[m.name].level)$('battleText').textContent+=' Có thể tiến hóa trong Đội hình!'}else $('battleText').textContent=wild.name+' đã bị đánh bại! Nhận '+reward+' vàng.';if(state.quest===1)setQuest(2);if(isGym){const badge=gym?gym.badge:'Đá';state.gymClear=true;if(!state.badges.includes(badge))state.badges.push(badge);$('battleText').textContent='🏆 CHIẾN THẮNG NHÀ THI ĐẤU! Nhận '+reward+' vàng và Huy hiệu '+badge+'!'}else if(trainer){if(!state.trainersDefeated.includes(trainer.id))state.trainersDefeated.push(trainer.id);$('battleText').textContent='🏅 Đã thắng '+trainer.label+'! Nhận '+trainer.reward+' vàng.'}hud();setTimeout(end,1400);return}setTimeout(enemyTurn,650);hud()};
 $('attack').onclick=()=>playerHit(state.party[0].atk,'Đòn đánh thường');$('special').onclick=()=>{const move=signatureMoveFor(state.party[0]);playerHit(state.party[0].atk+move.bonus,'✨ '+move.name,move)};
 $('catch').onclick=()=>{if(isGym||trainer){$('battleText').textContent=isGym?'Không thể bắt Pokémon của Nhà Thi Đấu!':'Không thể bắt Pokémon của huấn luyện viên!';return}if(ended||turn)return;if(state.balls<1){$('battleText').textContent='Bạn đã hết bóng Poké!';return}state.balls--;hud();const chance=Math.min(.92,.24+(1-wild.current/wild.maxHp)*.62+(wild.current/wild.maxHp<.25?.12:0));if(Math.random()<chance){sound('catch');if(state.party.length<6){state.party.push({...wild,current:wild.maxHp});$('battleText').textContent='Bắt thành công '+wild.name+'! Pokémon đã gia nhập đội.'}else{$('battleText').textContent='Đội hình đã đủ 6. '+wild.name+' được ghi vào Pokédex.'}if(!state.dex.includes(wild.name))state.dex.push(wild.name);state.gold+=10;if(state.quest===2)setQuest(3);hud();setTimeout(end,1350)}else{$('battleText').textContent=wild.name+' thoát khỏi bóng!';turn=true;setTimeout(enemyTurn,650)}save()};
 $('run').onclick=()=>{if(ended||turn)return;if(Math.random()<.82){end();toast('Bạn đã rút lui an toàn.')}else{$('battleText').textContent='Không thể chạy thoát! Đối thủ chặn đường.';turn=true;setTimeout(enemyTurn,550)}};
}
function interact(){if(!player||busy)return;const n=scene.npcs.find(n=>Phaser.Math.Distance.Between(player.x,player.y,n.x,n.y)<95);if(!n){if(companion&&Phaser.Math.Distance.Between(player.x,player.y,companion.x,companion.y)<125){petCompanion();return}toast('Không có ai ở gần. Hãy đến gần NPC hoặc Pokémon đồng hành.');return}if(n.label.startsWith('NGỌC TRAI')){if(!state.islandQuest){toast('Hãy nói chuyện với Người Giữ Đảo trước.');return}const id=n.label.slice(-1);if(state.islandShells.includes(id)){toast('Bạn đã nhặt ngọc trai này rồi.');return}state.islandShells.push(id);save();toast('Đã tìm được ngọc trai '+state.islandShells.length+'/3!');if(state.islandShells.length===3)toast('Đủ 3 viên! Hãy quay lại Người Giữ Đảo.');return}
if(n.label==='NGƯỜI GIỮ ĐẢO'){if(!state.islandQuest){state.islandQuest=true;save();panel('TRUYỀN THUYẾT ĐẢO SAN HÔ','CHƯƠNG MỚI · NHIỆM VỤ','<p>Đảo San Hô từng được bảo vệ bởi một Pokémon biển hiền lành. Hãy tìm ba viên ngọc trai thất lạc quanh đảo.</p><p>Quay lại gặp ta sau khi thu thập đủ.</p><button class="primary" id="islandStart">NHẬN NHIỆM VỤ</button>');$('islandStart').onclick=()=>hide('panel');return}if(state.islandShells.length<3){panel('TRUYỀN THUYẾT ĐẢO SAN HÔ','TIẾN ĐỘ','<p>Ngọc trai đã tìm: '+state.islandShells.length+'/3.</p><button class="primary" id="islandClose">TIẾP TỤC</button>');$('islandClose').onclick=()=>hide('panel');return}if(!state.islandReward){state.islandReward=true;state.gold+=700;state.balls+=4;state.rideUnlocked=true;save();hud();panel('LỜI HỨA CỦA BIỂN','NHIỆM VỤ HOÀN THÀNH','<p>Ngươi đã khôi phục báu vật của đảo. Nhận 700 vàng, 4 bóng Poké và khả năng cưỡi Lapras vượt biển!</p><p>Thuyền trưởng ở bến cảng có thể đưa ngươi về Viridian.</p><button class="primary" id="islandDone">TUYỆT VỜI</button>');$('islandDone').onclick=()=>hide('panel');return}toast('Biển cả đã mở lối cho bạn. Hãy khám phá đảo!');return}
if(n.label==='THUYỀN VỀ VIRIDIAN'){player.setPosition(4950,900);scene.cameras.main.setBounds(3780,60,3320,1340);setZone('viridian');toast('Bạn đã cập bến Viridian.');return}
if(n.label==='THUYỀN TRƯỞNG'){if(!state.rideUnlocked){panel('BẾN CẢNG VIRIDIAN','CHUYẾN ĐI BIỂN','<p>Ta có thể đưa bạn đến Đảo San Hô. Người giữ đảo đang cần giúp đỡ.</p><button class="primary" id="sailOut">ĐẾN ĐẢO SAN HÔ</button>');$('sailOut').onclick=()=>{hide('panel');player.setPosition(5850,680);scene.cameras.main.setBounds(5480,0,1620,1400);setZone('island');toast('Con thuyền cập bến Đảo San Hô!')};return}player.setPosition(4950,900);scene.cameras.main.setBounds(3780,60,3320,1340);setZone('viridian');toast('Thuyền đã đưa bạn về Viridian.');return}
if(n.label.startsWith('TINH THỂ CỔ')){const shard=n.label.slice(-1);if(!state.crystalQuest){toast('Hãy nói chuyện với Nhà Nghiên Cứu trước.');return}if(state.crystalShards.includes(shard)){toast('Mảnh tinh thể này đã được thu thập.');return}state.crystalShards.push(shard);save();toast('Đã thu thập tinh thể '+state.crystalShards.length+'/3!');if(state.crystalShards.length===3)toast('Đủ 3 tinh thể! Hãy quay lại Nhà Nghiên Cứu.');return}
if(n.label==='NHÀ NGHIÊN CỨU'){if(!state.crystalQuest){state.crystalQuest=true;save();panel('BÍ MẬT HANG THẠCH ANH','NHIỆM VỤ HUYỀN THOẠI','<p>Ba mảnh tinh thể cổ đang phát sáng trong hang. Hãy tìm và thu thập cả ba, rồi quay lại đây.</p><p>Phần thưởng: mở khóa cuộc chạm trán Pokémon huyền thoại.</p><button class="primary" id="crystalOk">NHẬN NHIỆM VỤ</button>');$('crystalOk').onclick=()=>hide('panel');return}if(state.crystalShards.length<3){panel('BÍ MẬT HANG THẠCH ANH','TIẾN ĐỘ NHIỆM VỤ','<p>Đã tìm thấy '+state.crystalShards.length+'/3 mảnh tinh thể. Hãy khám phá các góc hang còn lại.</p><button class="primary" id="crystalClose">TIẾP TỤC</button>');$('crystalClose').onclick=()=>hide('panel');return}const guardian={id:'crystal-guardian',mon:'Mewtwo',level:18,reward:900,legendary:true,hp:150,atk:25,def:18,label:'HỘ VỆ TINH THỂ'};if(state.trainersDefeated.includes(guardian.id)){toast('Bí mật tinh thể đã được bảo vệ. Cảm ơn Nhà Huấn Luyện!');return}panel('CỔNG NĂNG LƯỢNG','POKÉMON HUYỀN THOẠI','<p>Ba tinh thể hợp nhất, mở ra một thực thể tâm linh cực mạnh: Mewtwo cấp 18.</p><p>Chuẩn bị đội hình trước khi bước vào trận đấu!</p><button class="primary" id="guardianFight">ĐỐI ĐẦU MEWTWO</button>');$('guardianFight').onclick=()=>{hide('panel');startBattle(guardian)};return}
if(n.label==='LỐI VÀO HANG SÂU'){player.setPosition(3325,760);scene.cameras.main.setBounds(2980,80,690,860);setZone('caveInterior');toast('Bạn đã tiến vào tầng sâu Hang Thạch Anh.');return}
if(n.label==='RA KHỎI HANG'){player.setPosition(565,835);scene.cameras.main.setBounds(0,0,5400,1100);setZone('cave');toast('Bạn đã trở lại cửa hang.');return}
if(n.label==='CỔNG THÀNH PHỐ VIRIDIAN'){player.setPosition(4550,900);scene.cameras.main.setBounds(3780,60,3320,1340);setZone('viridian');toast('Chào mừng đến Thành phố Viridian!');return}
if(n.label==='CỔNG VỀ ĐƯỜNG 1'){player.setPosition(1380,500);scene.cameras.main.setBounds(0,0,7100,1400);setZone('route');toast('Bạn đã trở lại Đường 1.');return}
if(n.label==='NHÀ THI ĐẤU VIRIDIAN'){const gym2={kind:'gym',badge:'Rừng',boss:'Thủ Lĩnh Lá',emoji:'🌿',level:14,hp:125,atk:17,def:9,reward:500,type:'Cỏ/Độc',title:'NHÀ THI ĐẤU VIRIDIAN · HỆ CỎ'};if(!state.badges.includes('Đá')){panel('NHÀ THI ĐẤU VIRIDIAN','CHƯA ĐỦ ĐIỀU KIỆN','<p>Hãy chinh phục Nhà Thi Đấu Đá tại Kanto trước khi thách đấu Viridian.</p><button class="primary" id="gym2Locked">ĐÃ HIỂU</button>');$('gym2Locked').onclick=()=>hide('panel');return}if(state.badges.includes('Rừng')){toast('Bạn đã có Huy hiệu Rừng!');return}panel('NHÀ THI ĐẤU VIRIDIAN','THỬ THÁCH HỆ CỎ','<p>Thủ lĩnh Lá sử dụng Pokémon hệ Cỏ. Đối thủ cấp 14, HP 125.</p><p>Phần thưởng: 500 vàng và Huy hiệu Rừng.</p><button class="primary" id="gym2Fight">THÁCH ĐẤU THỦ LĨNH LÁ</button>');$('gym2Fight').onclick=()=>{hide('panel');startBattle(gym2)};return}
if(n.label==='NGƯỜI DẪN ĐƯỜNG'){panel('NGƯỜI DẪN ĐƯỜNG','THÀNH PHỐ VIRIDIAN','<p>Phía bắc là Nhà Thi Đấu Viridian. Bãi cỏ phía nam có Bellsprout và Spearow. Hãy chuẩn bị đội hình trước khi thách đấu!</p><button class="primary" id="guideClose">ĐÃ HIỂU</button>');$('guideClose').onclick=()=>hide('panel');return}
if(n.label==='CỬA HÀNG PALLET'){player.setPosition(1950,700);scene.cameras.main.setBounds(1600,100,700,740);setZone('shop');toast('Đã vào Cửa hàng Pallet.');return}
if(n.label==='TRUNG TÂM POKÉMON'){player.setPosition(2550,700);scene.cameras.main.setBounds(2250,100,600,740);setZone('center');toast('Đã vào Trung tâm Pokémon.');return}
if(n.label==='CỬA RA THỊ TRẤN'){player.setPosition(370,390);scene.cameras.main.setBounds(0,0,5400,1100);setZone('pallet');toast('Trở lại Thị trấn Pallet.');return}
if(n.label==='CHỦ CỬA HÀNG'){panel('CỬA HÀNG PALLET','VẬT PHẨM HÀNH TRÌNH','<p>Mua vật phẩm để chuẩn bị cho chuyến phiêu lưu.</p><div class="itemrow"><span>🔴 3 bóng Poké</span><button id="shopBalls">60 vàng</button></div><div class="itemrow"><span>🧪 1 thuốc hồi phục</span><button id="shopPotion">45 vàng</button></div><p class="muted">Số vàng hiện có: '+state.gold+'</p>');$('shopBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();interactShopRefresh()};$('shopPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();interactShopRefresh()};return}
if(n.label==='Y TÁ JOY'){state.party.forEach(m=>m.current=m.maxHp);save();openTeam();toast('Y tá Joy đã hồi phục toàn bộ đội hình!');return}
if(n.label==='GIÁO SƯ OAK'){if(!state.oakTalk){state.oakTalk=true;if(state.quest===0)setQuest(1);panel('GIÁO SƯ OAK','PHÒNG NGHIÊN CỨU','<p>Chào mừng đến với Kanto! Thế giới này rộng lớn và đầy những Pokémon kỳ thú.</p><p>Hãy đi vào bãi cỏ Đường 1, chiến đấu và kết bạn với Pokémon. Ta sẽ chờ tin tốt từ con!</p><button class="primary" id="oakOk">ĐÃ HIỂU</button>');$('oakOk').onclick=()=>hide('panel')}else{panel('GIÁO SƯ OAK','LỜI KHUYÊN','<p>Hãy quan sát bãi cỏ, chuẩn bị bóng Poké và chăm sóc đội hình của con.</p><button class="primary" id="oakOk">ĐÓNG</button>');$('oakOk').onclick=()=>hide('panel')}}else if(n.label==='NGƯỜI CÂU CÁ'){if(state.quest>=5)toast('Người câu cá: Chúc mừng Nhà Huấn Luyện! Hồ này còn nhiều bí mật.');else{setQuest(4);panel('NGƯỜI CÂU CÁ','BỜ HỒ XANH','<p>Nước hồ trong veo lắm! Hãy chuẩn bị đội hình trước khi khám phá sâu hơn.</p><button class="primary" id="fishOk">CẢM ƠN</button>');$('fishOk').onclick=()=>hide('panel')}}else{const t=scene.trainers&&scene.trainers.find(t=>t.id===n.id);if(t){if(state.trainersDefeated.includes(t.id)){toast('Bạn đã đánh bại '+t.label+' rồi.');return}panel(t.label,'THÁCH ĐẤU HUẤN LUYỆN VIÊN','<p>'+t.label+' muốn so tài với bạn. Đối thủ: '+t.mon+' · Lv.'+t.level+'</p><p>Phần thưởng khi thắng: '+t.reward+' vàng.</p><button class="primary" id="trainerFight">BẮT ĐẦU ĐẤU</button>');$('trainerFight').onclick=()=>{hide('panel');startBattle(t)}}}}
function interactShopRefresh(){panel('CỬA HÀNG PALLET','VẬT PHẨM HÀNH TRÌNH','<p>Vật phẩm đã được cập nhật.</p><div class="itemrow"><span>🔴 3 bóng Poké</span><button id="shopBalls">60 vàng</button></div><div class="itemrow"><span>🧪 1 thuốc hồi phục</span><button id="shopPotion">45 vàng</button></div><p class="muted">Số vàng hiện có: '+state.gold+'</p>');$('shopBalls').onclick=()=>{if(state.gold<60)return toast('Không đủ vàng!');state.gold-=60;state.balls+=3;save();hud();interactShopRefresh()};$('shopPotion').onclick=()=>{if(state.gold<45)return toast('Không đủ vàng!');state.gold-=45;state.potions++;save();hud();interactShopRefresh()}}
function bindControls(){const sprint=$('sprint');if(sprint){const begin=e=>{e.preventDefault();sprintHeld=true;sprint.classList.add('active');try{sprint.setPointerCapture(e.pointerId)}catch{}};const finish=()=>{sprintHeld=false;sprint.classList.remove('active')};sprint.addEventListener('pointerdown',begin);['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>sprint.addEventListener(ev,finish));sprint.addEventListener('contextmenu',e=>e.preventDefault())}const audioBtn=$('audioToggle');if(audioBtn)audioBtn.onclick=()=>{audioEnabled=!audioEnabled;audioBtn.textContent=audioEnabled?'ÂM THANH: BẬT':'ÂM THANH: TẮT';if(audioEnabled)sound('win')};document.querySelectorAll('[data-dir]').forEach(b=>{const d=b.dataset.dir;b.addEventListener('pointerdown',e=>{e.preventDefault();heldDir=d;try{b.setPointerCapture(e.pointerId)}catch{}});['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>b.addEventListener(ev,stopMove))});window.addEventListener('keydown',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});window.addEventListener('keyup',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=false});window.addEventListener('blur',()=>{keys={};stopMove()});$('team').onclick=openTeam;const pet=$('pet');if(pet)pet.onclick=petCompanion;const ride=$('ride');if(ride)ride.onclick=toggleRide;$('dex').onclick=openDex;$('bag').onclick=openBag;$('quests').onclick=openQuests;const mapBtn=$('worldMap');if(mapBtn)mapBtn.onclick=openWorldMap;$('interact').onclick=interact;$('closePanel').onclick=()=>hide('panel');}
$('start').onclick=()=>{hide('welcome');if(!state.party.length)show('starter');else toast('Chào mừng trở lại Kanto!')};
document.querySelectorAll('[data-starter]').forEach(b=>{const n=b.dataset.starter;const art=b.querySelector('.creature');if(art)art.innerHTML=monArtMarkup(n,species[n].emoji)});
document.querySelectorAll('[data-starter]').forEach(b=>b.onclick=()=>{const m=makeMon(b.dataset.starter,5);state.party=[m];state.dex=[m.name];setCompanionMon();hide('starter');hud();save();toast(m.name+' đã trở thành bạn đồng hành!');if(state.quest===0)setQuest(0)});
bindControls();hud();createGame();if(state.party.length)$('start').textContent='TIẾP TỤC HÀNH TRÌNH';else show('welcome');
})();