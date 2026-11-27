# DK Pokémon — Hành Trình Kanto

Game nhập vai pixel-art tiếng Việt, thiết kế ưu tiên điện thoại và điều khiển cảm ứng.

## Chạy thử
1. Mở repository này trên GitHub.
2. Vào **Settings → Pages**.
3. Ở **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn nhánh **main**, thư mục **/ (root)** rồi nhấn **Save**.
5. Mở địa chỉ GitHub Pages do GitHub cung cấp. Phaser 3 được tải từ jsDelivr nên lần đầu cần Internet.

## Tính năng trong bản nâng cấp
- Bản đồ Kanto cuộn theo nhân vật, có thị trấn, đường, rừng, hồ, nhà và vùng cỏ cao.
- Điều khiển bằng nút cảm ứng hoặc WASD/phím mũi tên; có giới hạn biên bản đồ và vật cản cơ bản.
- Chọn Bulbasaur, Charmander hoặc Squirtle làm Pokémon đầu tiên.
- Gặp Pokémon theo khu vực; chiến đấu theo lượt, kỹ năng, bắt Pokémon và phần thưởng.
- Đội hình tối đa 6 Pokémon, Pokédex đã gặp, cấp độ/XP và chỉ số cơ bản.
- Túi đồ, mua bóng Poké/thuốc hồi phục bằng vàng.
- NPC Giáo sư Oak và người câu cá; chuỗi nhiệm vụ mở đầu.
- Tự động lưu tiến trình bằng localStorage trên trình duyệt hiện tại.

## Lưu ý
Đây là bản chơi thử đang phát triển, chưa phải game hoàn chỉnh. Các sinh vật trong bản này dùng biểu tượng emoji làm placeholder; chưa có sprite-sheet hoạt họa, nhạc nền, hệ thống tiến hóa, Gym, multiplayer hay APK Android. Phaser 3 cần tải từ CDN khi mở game. Dữ liệu lưu nằm trên trình duyệt/thiết bị, không tự đồng bộ giữa các máy.

## Lộ trình tiếp theo
1. Thay placeholder bằng sprite pixel-art có hoạt ảnh và hiệu ứng chiến đấu.
2. Hoàn thiện va chạm địa hình, bản đồ từng khu vực và NPC/nhiệm vụ theo chương.
3. Bổ sung tiến hóa, Gym, boss và hệ thống kỹ năng/thuộc tính sâu hơn.
4. Thêm âm thanh, cài đặt và kiểm thử hiệu năng trên Android.
5. Đóng gói APK sau khi gameplay web ổn định.


## Nội dung vừa bổ sung
- Tiến hóa theo cấp cho ba Pokémon khởi đầu: Bulbasaur → Ivysaur → Venusaur; Charmander → Charmeleon → Charizard; Squirtle → Wartortle → Blastoise.
- Nút tiến hóa chỉ xuất hiện khi Pokémon đạt cấp yêu cầu; tiến hóa thay đổi tên, hình biểu tượng, kỹ năng và chỉ số.
- Thử thách Nhà Thi Đấu Đá với Thủ Lĩnh cấp 10, lượng HP và sức tấn công cao hơn, thưởng 300 vàng khi chiến thắng.
- Tiến trình tiến hóa và phần thưởng được ghi vào dữ liệu lưu trình duyệt.
