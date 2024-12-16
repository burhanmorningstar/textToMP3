// DOM elemanlarını seç
const form = document.getElementById("newsForm");
const newsLinkInput = document.getElementById("newsLink");
const loadingIndicator = document.getElementById("loading");
const audioPlayer = document.getElementById("audioPlayer");
const submitButton = document.getElementById("submitButton");

// Form gönderimini dinle
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Formun varsayılan davranışını engelle

  const newsUrl = newsLinkInput.value;

  if (!newsUrl) {
    alert("Lütfen geçerli bir haber URL'si girin.");
    return;
  }

  // Yükleniyor göstergesini ve butonu devre dışı bırak
  loadingIndicator.style.display = "block";
  submitButton.disabled = true;

  try {
    // Sunucuya POST isteği gönder
    const response = await axios.post("http://localhost:3000/api/scrape", {
      url: newsUrl,
    });

    console.log("Sunucudan dönen yanıt:", response.data);

    if (response.status === 200 && response.data.audioUrl) {
      const audioUrl = response.data.audioUrl;
      const audioSource = document.createElement("audioSource");
      // Oynatıcıya URL'yi ekle ve göster
      audioSource.src = audioUrl;
      audioPlayer.src = audioUrl;
    } else {
      alert(
        response.data.error || "Ses oluşturulamadı. Lütfen tekrar deneyin."
      );
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
    if (error.response) {
      alert(
        `Sunucu hatası: ${error.response.status} - ${error.response.data.error}`
      );
    } else if (error.request) {
      alert("Sunucuya bağlanılamadı. Lütfen bağlantınızı kontrol edin.");
    } else {
      alert("Bir hata oluştu. Detaylar konsola yazıldı.");
    }
  } finally {
    // Yükleniyor göstergesini gizle ve butonu aktif yap
    loadingIndicator.style.display = "none";
    submitButton.disabled = false;
  }
});
