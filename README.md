# DK Pokémon — Hành Trình Kanto

Game nhập vai pixel-art tiếng Việt, thiết kế ưu tiên điện thoại và điều khiển cảm ứng.

## Chạy thử
1. Mở repository này trên GitHub.
2. Vào **Settings → Pages**.
3. Ở **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn nhánh **main**, thư mục **/ (root)** rồi nhấn **Save**.
5. Mở địa chỉ GitHub Pages do GitHub cung cấp. Phaser 3 được tải từ jsDelivr nên lần đầu cần Internet.

## Tính năng trong bản nâng cấp
- Bộ minh họa SVG Pokémon tự thiết kế trong thư mục `assets/pokemon/`, gồm các loài Kanto và Pokémon bổ sung cho Hang Thạch Anh/Đảo San Hô; được dùng ở màn chọn Pokémon, đội hình và trận đấu.
- Pokémon có chuyển động nhàn rỗi/hiệu ứng xuất hiện; nhân vật huấn luyện viên có hoạt ảnh hai chân luân phiên khi di chuyển.
- Âm thanh hiệu ứng được tạo trực tiếp bằng Web Audio (đánh, kỹ năng, bắt Pokémon, chiến thắng, tiến hóa), có nút bật/tắt; hình tiến hóa dùng minh họa cùng dòng trong khi chờ bộ tiến hóa riêng.
- Nhân vật huấn luyện viên vẽ theo phong cách pixel-art bằng các lớp hình, có nhịp bước/chuyển động chờ và xoay hướng theo di chuyển.
- Hiệu ứng xuất hiện và chuyển động nhàn rỗi cho Pokémon trong màn hình chiến đấu.
- Bản đồ Kanto cuộn theo nhân vật, có thị trấn, đường, rừng, hồ, nhà và vùng cỏ cao.
- Điều khiển bằng nút cảm ứng hoặc WASD/phím mũi tên; có giới hạn biên bản đồ và vật cản cơ bản.
- Chọn Bulbasaur, Charmander hoặc Squirtle làm Pokémon đầu tiên.
- Gặp Pokémon theo khu vực; chiến đấu theo lượt, kỹ năng, bắt Pokémon và phần thưởng.
- Đội hình tối đa 6 Pokémon, Pokédex đã gặp, cấp độ/XP và chỉ số cơ bản.
- Túi đồ, mua bóng Poké/thuốc hồi phục bằng vàng.
- Pokédex dạng thẻ: loài chưa gặp được ẩn danh, loài đã gặp hiển thị minh họa và hệ.
- Hệ thống Huy hiệu Đá lưu theo tiến trình; không thể bắt Pokémon của thủ lĩnh hoặc nhận thưởng Gym lặp lại.
- Tương khắc hệ cơ bản ảnh hưởng sát thương: một số cặp hệ mạnh/yếu có hệ số rõ ràng trong thông báo trận đấu.
- NPC Giáo sư Oak, người câu cá và ba huấn luyện viên có Pokémon/cấp độ/phần thưởng riêng; thắng xong được ghi nhớ để không farm thưởng lặp.
- Cửa hàng Pallet và Trung tâm Pokémon là hai nội thất có thể đi vào/đi ra; mua bóng/thuốc và hồi phục toàn đội tại y tá Joy.
- Hiệu ứng nền trận đấu đổi sắc theo hệ chiêu của Pokémon: Lửa, Nước, Cỏ và kỹ năng đặc biệt.
- Khu Hang Đá Thạch Anh có cửa hang minh họa, vùng địa hình riêng và nhóm Pokémon hoang dã khác.
- Tự động lưu tiến trình bằng localStorage trên trình duyệt hiện tại.

## Lưu ý
Đây là bản chơi thử đang phát triển, chưa phải game hoàn chỉnh. Một số NPC và thông báo vẫn dùng emoji; chưa có sprite-sheet nhiều khung hình riêng cho từng Pokémon, nhạc nền/lồng tiếng, multiplayer hoặc APK Android hoàn chỉnh. Hiệu ứng âm thanh hiện là âm tổng hợp, chưa phải lồng tiếng/nhạc nền. Nhân vật người chơi đã được vẽ lại bằng các lớp pixel-art và có hoạt ảnh cơ bản. Phaser 3 cần tải từ CDN khi mở game. Dữ liệu lưu nằm trên trình duyệt/thiết bị, không tự đồng bộ giữa các máy.

## Lộ trình tiếp theo
1. Tạo bộ sprite-sheet Pokémon pixel-art riêng và hoạt ảnh di chuyển/chiêu thức.
2. Hoàn thiện va chạm địa hình, bản đồ từng khu vực và NPC/nhiệm vụ theo chương.
3. Bổ sung tiến hóa, Gym, boss và hệ thống kỹ năng/thuộc tính sâu hơn.
4. Hoàn thiện hoạt ảnh sprite-sheet, âm thanh và tối ưu điều khiển cảm ứng.
5. Kiểm thử gameplay trên trình duyệt Android, sau đó mới đóng gói APK ngang.


## Nội dung vừa bổ sung
- Tiến hóa theo cấp cho ba Pokémon khởi đầu: Bulbasaur → Ivysaur → Venusaur; Charmander → Charmeleon → Charizard; Squirtle → Wartortle → Blastoise.
- Nút tiến hóa chỉ xuất hiện khi Pokémon đạt cấp yêu cầu; tiến hóa thay đổi tên, hình biểu tượng, kỹ năng và chỉ số.
- Thử thách Nhà Thi Đấu Đá với Thủ Lĩnh cấp 10, lượng HP và sức tấn công cao hơn, thưởng 300 vàng khi chiến thắng.
- Tiến trình tiến hóa và phần thưởng được ghi vào dữ liệu lưu trình duyệt.


## Nội dung mở rộng
- Hang Thạch Anh có lối vào tầng sâu riêng, bản đồ hang tối, tinh thể phát sáng và lối thoát trở về cửa hang; có thể gặp Zubat và Diglett.
- Thành phố Viridian có khu phố, công viên, bãi cỏ riêng, NPC hướng dẫn và cổng kết nối Đường 1.
- Nhà Thi Đấu Viridian là thử thách thứ hai: Thủ Lĩnh Lá cấp 14, 125 HP, thưởng 500 vàng và Huy hiệu Rừng; huy hiệu được lưu riêng và không thể nhận lặp.
- Bổ sung Bellsprout, Spearow, Zubat và Diglett vào Pokédex và bảng xuất hiện theo khu vực.


## Cập nhật hệ thống chiến đấu
- Có thể đổi Pokémon đang chiến đấu bằng nút **Đổi Pokémon**; Pokémon được đổi vào cuối đội hình và Pokémon mới trở thành đồng hành trên bản đồ.
- Có thể dùng thuốc hồi phục ngay trong trận đấu; mỗi lần dùng tiêu thụ một thuốc và đối thủ được phản công.
- Đòn đánh có xác suất chí mạng; hiệu quả hệ tiếp tục tác động lên sát thương.
- Bắt Pokémon dễ hơn khi HP đối thủ thấp, nhưng vẫn có xác suất thất bại.
- Rút lui có xác suất thành công; nếu thất bại, đối thủ được phản công.


## Mở rộng Hang Thạch Anh và thế giới sống động
- Chu kỳ ngày/đêm chạy theo thời gian trong game; thời gian và thời tiết được lưu trong tiến trình.
- Mưa xuất hiện ngẫu nhiên với hiệu ứng hạt mưa và lớp ánh sáng thay đổi theo thời điểm.
- Nhà Nghiên Cứu trong Hang Thạch Anh giao nhiệm vụ thu thập ba tinh thể cổ.
- Thu thập đủ ba tinh thể sẽ mở khóa trận đấu Mewtwo cấp 18 với phần thưởng 900 vàng.
- Tiến trình tinh thể, nhiệm vụ và thời gian được lưu tự động.


## Đảo San Hô và hành trình biển
- Mở rộng thế giới đến Đảo San Hô, có vùng nước, bãi cát, rừng cọ và bãi cỏ gặp Pokémon.
- Thuyền trưởng tại bến Viridian đưa người chơi đến đảo.
- Người Giữ Đảo giao nhiệm vụ tìm ba viên ngọc trai; hoàn thành nhận 700 vàng, 4 bóng Poké và mở khóa cưỡi Lapras.
- Nút cưỡi Lapras tăng tốc độ di chuyển; có thể xuống bất cứ lúc nào.
- HUD hiển thị đúng tên khu vực Đảo San Hô khi người chơi cập bến.
- Thanh nhiệm vụ ưu tiên hiển thị tiến độ nhiệm vụ phụ đang thực hiện: ngọc trai Đảo San Hô hoặc tinh thể Hang Thạch Anh.
- Bộ sprite-sheet SVG 4 khung hình cho 18 loài Pokémon; hoạt ảnh được dùng trong đội hình, Pokédex, màn hình chiến đấu và Pokémon đồng hành.
- Pokémon mới: Seel, Lapras, Dratini và Sandshrew.


## Hoạt ảnh chuyển động Pokémon
- Pokémon đồng hành thay đổi nhịp hoạt ảnh theo trạng thái đứng yên, đi bộ và chạy; khi chạy có độ nảy, nghiêng và nhịp khung hình mạnh hơn.
- Đòn đánh thường và chiêu đặc biệt có trạng thái chuyển động riêng; chiêu đặc biệt có cú lao, nhấn sáng và quầng năng lượng rõ hơn.
- Tôn trọng cài đặt giảm chuyển động của thiết bị.
- Các sprite-sheet hiện tại vẫn là bộ 4 khung idle được biến đổi nhẹ; đây chưa phải bộ pose walk/run/attack vẽ riêng cho từng loài.


## Bộ sprite chuyển động đồng hành
- Bổ sung 18 sprite-sheet chuyển động riêng theo từng loài, mỗi sheet có 4 khung hình và được tải trực tiếp khi Pokémon trở thành bạn đồng hành.
- Hoạt ảnh có nhịp riêng cho đứng yên, đi bộ và chạy; chạy tăng tốc phát khung hình.
- Sprite-sheet idle cũ vẫn được giữ cho giao diện đội hình, Pokédex và khung chiến đấu.
- Các khung chuyển động hiện là biến thể tư thế bằng biến đổi hình học từ artwork gốc, chưa phải hoạt ảnh khớp xương hoặc vẽ lại từng chi tiết giải phẫu.


## Hoạt ảnh chiến đấu Pokémon
- Đòn đánh thường, kỹ năng đặc biệt, phản đòn và né đòn có chuyển động riêng; chuyển động được tinh chỉnh theo dáng từng loài trong 18 Pokémon có sprite.
- Hệ chiêu tạo hiệu ứng màu/burst riêng cho Lửa, Nước, Cỏ, Đất/Đá, Bay, Độc, Tâm linh và Băng.
- Tỉ lệ né phản công có điều chỉnh theo hệ Bay/Nước; khi né thành công không bị trừ HP.
- Đây là hoạt ảnh CSS kết hợp sprite-sheet 4 khung hiện có và biến thể chuyển động theo loài, chưa phải hoạt ảnh khung hình vẽ tay riêng cho từng đòn đánh.


### Overworld animation and ambience
- Trainer movement includes alternating leg/boot motion, body sway and sprint cadence.
- NPCs have ground shadows, clearer nameplates and a subtle pulsing halo.
- Footstep dust appears periodically while the player moves.
- The world clock controls ambient fireflies at night and drifting leaf motes during daytime; rain visibility remains weather-aware.


### Bản đồ Kanto và dịch chuyển nhanh
- Nút **BẢN ĐỒ** hiển thị sơ đồ Kanto, khu vực đã khám phá và các điểm chưa mở khóa.
- Tiến trình khám phá khu vực được lưu trong localStorage cùng dữ liệu trò chơi.
- Chỉ những khu vực người chơi đã từng ghé thăm mới có thể dịch chuyển nhanh; điểm đến hiện tại bị vô hiệu hóa.
- Khi dịch chuyển, nhân vật, giới hạn vật lý và camera được đưa về tọa độ an toàn của khu vực.


### Quest markers, NPC alerts and exploration rewards
- Active main-story and side-quest objectives are shown as marked pins on the Kanto map, with a short explanation and target zone.
- NPCs and collectible quest items display floating !, ?, battle or item markers in the overworld when interaction is available.
- The quest journal now separates the Kanto story from the Crystal Cave and Coral Island side quests, and shows collection progress.
- First discovery of each major travel region (excluding Pallet) grants **35 gold and 1 Potion**. The region is recorded in the existing saved discovery list, so its exploration reward cannot be farmed by leaving and returning.
- Exploration reward is granted once per newly discovered major region; previously saved regions do not retroactively grant rewards.


### Adaptive trainer switching during battle
- Huấn luyện viên có thể chủ động đổi sang Pokémon dự bị ngay trong trận nếu Pokémon hiện tại bị khắc chế rõ rệt hoặc có lựa chọn dự bị tạo lợi thế tốt hơn; hành động đổi tiêu tốn lượt của đối thủ, mỗi Pokémon đang đấu chỉ kích hoạt một lần để tránh đổi liên tục.
- Pokémon đã được tung ra rồi không tự hồi sinh hoặc quay lại đội dự bị; Pokémon dự bị được chọn sẽ rời danh sách chờ, và phần thưởng chỉ trao sau khi đánh bại toàn bộ đội hình.
- Quyết định đổi Pokémon dùng luật chấm điểm cục bộ dựa trên tương khắc hệ, rủi ro bị khắc chế, HP và sức tấn công; không gọi API hoặc mô hình AI bên ngoài.

- AI chiến đấu đánh giá lợi thế tấn công, nguy cơ bị khắc chế, HP hai bên và trạng thái hiện tại để chọn lối đánh: tấn công, gây áp lực, phòng thủ hoặc chuẩn bị kỹ năng.
- Ưu tiên kỹ năng có thể gây trạng thái khi đối thủ chưa mắc trạng thái; né tránh và dựng khiên được cân nhắc theo thế trận. Mỗi Pokémon chỉ dựng khiên một lần.
- Trong trận huấn luyện viên, mỗi Pokémon được hồi sức tối đa một lần khi HP xuống 28% hoặc thấp hơn, hồi 18% HP tối đa; hành động này tiêu tốn lượt. Đổi Pokémon sẽ đặt lại giới hạn riêng cho Pokémon mới.

### Living overworld, regional weather and surprise events
- Ambient wild Pokémon now appear inside tall-grass encounter patches and wander short distances with a bobbing idle motion and a separate ground shadow. These are visual overworld creatures; entering grass still uses the existing encounter/battle system.
- NPCs have extra idle sway and breathing-like shadow movement while their quest markers remain synchronized.
- The world clock supports clear weather, rain, storms and fog. Storm rain falls faster; fog is shown in forest/lake areas and the existing cave mist remains active underground.
- Walking through tall grass can trigger a surprise exploration event (once per 90 seconds): find 45 gold, a Potion, two Poké Balls, or a small mixed reward. Claiming the reward pauses movement until the player collects it; the cooldown timestamp is saved.


### Wild Pokémon behavior in the overworld
- Wild Pokémon now have simple behavior states: idle patrol within their grass patch, approach the trainer when a bold species notices them, flee from the trainer when a shy species is approached, and return toward their home area after losing interest.
- Approaching a visible wild Pokémon closely starts a battle against that exact species instead of selecting a random encounter. The existing battle, capture, reward and Pokédex systems are reused.
- Ambient creatures are removed from the map after their encounter resolves, preventing duplicate interactions with the same actor. This is lightweight rule-based behavior, not a full pathfinding or learning AI system.


### Cinematic wild encounters and battle animation
- A visible wild Pokémon that reaches the trainer now performs a short approach/leap animation; the camera gives a subtle shake and flash before the battle panel opens.
- Battle entry now animates the arena, opponent and player's Pokémon separately. Existing normal attacks, special moves, enemy counterattacks and hit effects also animate the four-frame sprite-sheet elements, not only fallback image elements.
- Reduced-motion preferences disable the added CSS choreography. The effects are presentation-only and reuse the existing battle rules and capture logic.


### Elemental combat VFX and audio
- Player attacks now resolve a visual element from the lead Pokémon's type and spawn a matching impact burst: fire flames, water droplets, grass blades, ice shards, earth fragments, wind arcs, poison globes or psychic energy.
- Each elemental attack has a distinct synthesized Web Audio tone when sound is enabled. Special moves retain their stronger special-move sound.
- The combat damage, type-effectiveness multiplier, critical chance, enemy response and rewards are unchanged. Reduced-motion settings suppress the added particle animation.


### Reactive elemental battle arena
- The battlefield now changes its atmosphere for both the player's move and the opponent's counterattack, using the attacking Pokémon's type.
- Fire adds a warm heat glow; Water adds moving reflections/ripples; Grass sways with leaf-like light; Ice spreads frost lines; Earth reveals ground-crack patterns; Air creates gust rings; Poison produces colored mist; Psychic creates expanding energy rings.
- The arena effect is presentation-only and does not alter move power, type effectiveness, HP, or turn order. Reduced-motion settings disable continuous arena animation.


### Species signature moves and evolution identities
- Each of the 18 original species and all six starter evolution forms now has its own named signature move, visual choreography and individual bonus damage value.
- Examples: Charmander uses Hỏa Tốc, Charizard uses Long Hỏa, Blastoise uses Đại Thủy Pháo, Venusaur uses Bão Hoa, Lapras uses Băng Tuyết, and Mewtwo uses Sóng Tâm Linh.
- Signature effects use distinct silhouettes and trajectories layered over the elemental arena effects; the battle log displays the move's description. Existing type effectiveness, critical chance, turn flow, capture and reward rules remain intact.
- The move effects are original CSS/Web Audio game presentation, not official Pokémon animation or imported copyrighted game assets. Reduced-motion preferences suppress the added animation.


### Trạng thái chiến đấu và hiệu ứng khống chế
- Bổ sung năm trạng thái: Bỏng và Trúng độc gây sát thương theo lượt; Đóng băng và Choáng có thể khiến mục tiêu bỏ lỡ lượt; Trói chân làm giảm sát thương đòn đánh của Pokémon đang bị trói.
- Chiêu đặc trưng của từng loài có cơ hội gây trạng thái phù hợp: chiêu Lửa gây bỏng, chiêu Độc gây độc, chiêu Băng gây đóng băng, chiêu Tâm linh/âm thanh gây choáng, dây leo/đất đá gây trói chân.
- Pokémon đối thủ cũng có xác suất gây trạng thái dựa trên hệ khi phản công.
- Trạng thái được hiển thị trực tiếp dưới Pokémon trong trận đấu, có màu nhận diện riêng và tự hết sau số lượt quy định. Đây là hiệu ứng trong trận, không làm thay đổi dữ liệu lưu đội hình sau khi kết thúc.


### AI chiến thuật cho Pokémon đối thủ
- Đối thủ đánh giá tương quan hệ, HP của hai bên và trạng thái đang có để chọn nhịp chiến đấu: cân bằng, tấn công áp đảo, gây áp lực hoặc phòng thủ.
- Khi có lợi thế hệ hoặc người chơi sắp hết HP, AI tăng tần suất dùng chiêu đặc trưng thay vì chỉ đánh thường.
- Chiêu đặc trưng của đối thủ có thể gây bỏng, độc, đóng băng, choáng hoặc trói chân theo hồ sơ loài/hệ.
- Khi HP thấp và đang bất lợi về hệ, đối thủ có cơ hội dựng thế phòng thủ; đòn kế tiếp của người chơi bị giảm sát thương rồi thế thủ tự tiêu hao.
- AI là hệ luật chiến thuật cục bộ, không dùng mô hình học máy hoặc kết nối API.
- Cân bằng sát thương hiện tại được giữ trong phạm vi hệ thống chiến đấu hiện có; cần kiểm thử thực tế để tinh chỉnh xác suất và độ khó.


## Đội hình huấn luyện viên nhiều Pokémon
- Huấn luyện viên Minh sử dụng Rattata và Pidgey; Lan sử dụng Caterpie, Oddish và Bellsprout; Nam sử dụng Geodude, Sandshrew và Zubat.

- HUD trận đấu hiển thị bộ đếm đội hình huấn luyện viên (ví dụ 1/3 → 2/3 → 3/3); bộ đếm tự ẩn khi không phải trận huấn luyện viên và được dọn khi đóng trận.
- Khi một Pokémon của huấn luyện viên bị hạ, Pokémon tiếp theo tự động vào sân với HP đầy, hiệu ứng xuất trận và trạng thái riêng được làm mới.
- Phần thưởng và đánh dấu đã thắng chỉ được trao sau khi đánh bại toàn bộ đội hình; không thể bắt Pokémon thuộc đội hình huấn luyện viên.
- Hệ thống vẫn dùng AI chiến thuật luật cục bộ hiện có cho từng Pokémon đang xuất trận; chưa phải AI học máy hoặc cơ chế phối hợp đòn đánh đồng đội.

- AI đội hình huấn luyện viên: trước khi tung Pokémon dự bị, hệ thống chấm điểm các lựa chọn còn lại theo tương khắc hệ, tỷ lệ HP và sức tấn công; Pokémon phù hợp nhất với Pokémon người chơi đang dùng sẽ được ưu tiên. Danh sách dự bị được cập nhật sau khi chọn, bộ đếm vẫn giữ tổng quân số ban đầu. Đây là chiến thuật luật cục bộ, không dùng API hoặc mô hình học máy.


### AI phối hợp đội hình huấn luyện viên
- Mỗi Pokémon dự bị được AI phân vai theo tương quan hệ với Pokémon người chơi: **khắc chế** (ưu tiên tấn công), **phòng thủ** (giảm rủi ro nhận sát thương) hoặc **hỗ trợ chiến thuật** (ưu tiên nhịp thiết lập/chiêu đặc trưng).
- Bộ chọn Pokémon cân nhắc đồng thời lợi thế tấn công, khả năng chống chịu, HP, sức tấn công và độ bổ sung vai trò so với Pokémon đang hoạt động; ưu tiên đội hình có độ phủ hệ và vai trò đa dạng thay vì chỉ chọn hệ có sát thương cao nhất.
- Khi đổi Pokémon giữa trận, AI hiển thị vai trò được chọn trong nhật ký chiến đấu. Vai trò cũng tác động đến xu hướng chọn chiến thuật phòng thủ, áp đảo hoặc thiết lập.
- Đây là AI chiến thuật dựa trên luật và chỉ số trong game, không phải mô hình học máy; không dùng API. Pokémon dự bị không tự hồi máu hoặc tung đòn khi chưa ra sân.

- **Combo hỗ trợ → khắc chế:** Pokémon mang vai trò hỗ trợ ưu tiên chiêu đặc trưng khi có thể gây trạng thái; nếu gây trạng thái thành công, Pokémon mang vai trò khắc chế có thể tận dụng trạng thái đó ở lượt sau.
- Khi mục tiêu đang chịu trạng thái và Pokémon khắc chế ra sân, AI tăng ưu tiên chiêu đặc trưng và nhận thêm 18% sát thương cho đòn phối hợp. Nhật ký trận đấu thông báo rõ lúc mở combo và lúc kích hoạt combo.
- Combo chỉ áp dụng cho đội huấn luyện viên; trạng thái vẫn tuân theo thời hạn và quy tắc hiện có. Đây là cơ chế chiến thuật theo luật, không phải học máy.


### AI Boss nhiều giai đoạn
- Áp dụng cho thủ lĩnh Nhà Thi Đấu và Mewtwo Hộ Vệ Tinh Thể.
- **Giai đoạn 1 (trên 65% HP):** Boss chiến đấu theo AI chiến thuật cơ bản và tương khắc hệ.
- **Giai đoạn 2 (65% HP trở xuống):** Boss thức tỉnh khiên năng lượng một lần, giảm 28% sát thương của đòn đánh tiếp theo; chiêu đặc trưng xuất hiện thường xuyên hơn và sát thương tăng 12%.
- **Giai đoạn cuối (30% HP trở xuống):** Boss cuồng nộ, sát thương tăng 42%; có cơ hội 68% tung chiêu tối thượng trong mỗi lượt cho đến khi tung thành công một lần, với xác suất gây trạng thái cao hơn.
- Chuyển giai đoạn theo thứ tự, không bỏ qua giai đoạn 2 nếu một đòn đánh lớn làm HP tụt thẳng xuống ngưỡng cuối. Mỗi lần chuyển giai đoạn tiêu tốn lượt hành động của Boss và có thông báo riêng.
- Đấu trường đổi ánh sáng/viền theo giai đoạn; hiệu ứng giai đoạn cuối tôn trọng cài đặt giảm chuyển động. AI dùng luật cục bộ, không gọi API hoặc mô hình học máy.


### AI Boss thích nghi và chiêu cuối nhiều nhịp
- Boss theo dõi chuỗi đòn cùng hệ của người chơi trong trận. Nếu người chơi lặp lại cùng hệ ít nhất hai lượt liên tiếp, boss có 18% cơ hội né đòn một lần trong mỗi giai đoạn và chuẩn bị phản công.
- Sau khi né thành công, đòn đánh kế tiếp của boss được tăng 12% sát thương; đổi Pokémon hoặc dùng thuốc sẽ đặt lại chuỗi đọc đòn để tránh tính nhầm hành động hỗ trợ thành lặp chiêu.
- Chiêu tối thượng ở giai đoạn cuối có trình tự báo hiệu → tích tụ → xung kích → gây sát thương. Người chơi có khoảng chờ ngắn để nhận biết đòn quyết định trước khi sát thương được áp dụng.
- Hoạt ảnh có hiệu ứng riêng theo hệ và tôn trọng cài đặt giảm chuyển động. Cơ chế là AI luật cục bộ, không dùng API hoặc mô hình học máy.


### Phong cách chiến đấu riêng cho từng Boss
- **Thủ Lĩnh Đá — Địa Tâm Phá:** thiên về sức mạnh địa hệ, kỹ năng nặng hơn và hiệu ứng địa chấn; giai đoạn 2 dựng giáp đá.
- **Thủ Lĩnh Lá — Độc Hoa Khai Nở:** thiên về trạng thái độc, tăng xác suất gây trạng thái và hiệu ứng hoa lá.
- **Mewtwo — Sóng Xung Kích Tâm Linh:** thiên về sát thương kỹ năng và áp chế tâm linh; hiệu ứng tím riêng.
- Từng Boss có hệ số sát thương, sức mạnh kỹ năng, xác suất trạng thái và tên chiêu cuối riêng. Các thông số được giới hạn để tránh tăng độ khó vô hạn.


### Phản ứng va chạm và hạ gục trong trận đấu
- Chuẩn hóa cách kích hoạt lại hoạt ảnh để đòn đánh liên tiếp không bị mất hiệu ứng do lớp CSS cũ chưa kịp kết thúc.
- Đòn đánh tạo phản lực lùi riêng trên Pokémon trúng đòn; cú chí mạng có nhịp chớp sáng và rung đấu trường mạnh hơn.
- Pokémon né đòn, trúng đòn và kiệt sức có trạng thái chuyển động riêng; hoạt ảnh hạ gục chỉ mang tính trình bày, không thay đổi HP, lượt đánh hoặc phần thưởng.
- Tôn trọng tùy chọn giảm chuyển động của thiết bị.


### Chuyển động thế giới mở
- Pokémon đồng hành đổi hướng theo hướng di chuyển ngang, tăng nhịp sprite khi chạy và có nhịp nảy/bóng đổ tương ứng.
- Pokémon hoang dã nghiêng người theo hướng chạy, đổi tỷ lệ khung hình nhẹ khi bước, bóng đổ phản hồi theo nhịp.
- Nhân vật người chơi có biên độ bước chân, độ nghiêng thân và nhịp chạy rõ hơn; bụi bước chân dày và lớn hơn khi giữ nút chạy.
- Không thay đổi tốc độ di chuyển, vùng va chạm, xác suất gặp Pokémon hoặc logic nhiệm vụ.


### NPC phản ứng và tương tác gần
- Khi người chơi đến gần NPC, vòng sáng đổi màu và biểu tượng hội thoại xuất hiện phía trên nhân vật; rời khỏi vùng tương tác thì dấu hiệu tự ẩn.
- Khi nhấn tương tác, NPC có nhịp bật người và lời chào ngắn theo vai trò (Giáo sư Oak, người câu cá, người dẫn đường, nhà nghiên cứu, người giữ đảo, cửa hàng, y tá và huấn luyện viên).
- Lời chào chỉ là lớp trình bày; các nhiệm vụ, phần thưởng, điều kiện chiến đấu và tiến trình lưu hiện có không bị thay đổi.
- Hiệu ứng được cập nhật theo khoảng cách trong thế giới mở và dùng tween sẵn có của Phaser.
