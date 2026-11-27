# DK Pokémon — Hành Trình Kanto

Game nhập vai pixel-art tiếng Việt, thiết kế ưu tiên điện thoại và điều khiển cảm ứng.

## Chạy thử
1. Mở repository này trên GitHub.
2. Vào **Settings → Pages**.
3. Ở **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn nhánh **main**, thư mục **/ (root)** rồi nhấn **Save**.
5. Mở địa chỉ GitHub Pages do GitHub cung cấp. Phaser 3 được tải từ jsDelivr nên lần đầu cần Internet.

## Tính năng trong bản nâng cấp
- 9 minh họa SVG Pokémon tự thiết kế trong thư mục `assets/pokemon/`; được dùng ở màn chọn Pokémon, đội hình và trận đấu.
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
Đây là bản chơi thử đang phát triển, chưa phải game hoàn chỉnh. Một số NPC và thông báo vẫn dùng emoji; chưa có sprite-sheet nhiều khung hình cho từng Pokémon, nhạc nền, multiplayer, nội thất hang động chuyển cảnh riêng, nhiều Gym hoặc APK Android. Hiệu ứng âm thanh hiện là âm tổng hợp, chưa phải lồng tiếng/nhạc nền. Nhân vật người chơi đã được vẽ lại bằng các lớp pixel-art và có hoạt ảnh cơ bản. Phaser 3 cần tải từ CDN khi mở game. Dữ liệu lưu nằm trên trình duyệt/thiết bị, không tự đồng bộ giữa các máy.

## Lộ trình tiếp theo
1. Tạo bộ sprite-sheet Pokémon pixel-art riêng và hoạt ảnh di chuyển/chiêu thức.
2. Hoàn thiện va chạm địa hình, bản đồ từng khu vực và NPC/nhiệm vụ theo chương.
3. Bổ sung tiến hóa, Gym, boss và hệ thống kỹ năng/thuộc tính sâu hơn.
4. Thêm âm thanh, cài đặt và kiểm thử hiệu năng trên Android.
5. Đóng gói APK sau khi gameplay web ổn định.


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
