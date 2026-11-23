<?php
$pageTitle  = 'Kuis Mengenal Komputer';
$pageCSS    = 'quiz.css';
$activePage = 'games';
include 'partials/head.php';
include 'partials/header.php';
?>
<main class="page-main" id="main-content">
  <div class="container">
    <div class="quiz-container">

      <a href="games.php" class="back-link">← Kembali ke Menu Game</a>

      <div class="page-header">
        <p class="page-header__eyebrow">📝 Kuis</p>
        <h1 class="page-header__title">Kuis Mengenal Komputer</h1>
        <p class="page-header__subtitle">Jawab 5 soal tentang bagian-bagian komputer!</p>
      </div>

      <!-- Quiz game panel -->
      <div id="quizGame">
        <!-- Progress -->
        <div style="margin-bottom:var(--space-5)">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-2)">
            <span style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-text-muted)" id="quizNumber">Soal <span>1 dari 5</span></span>
          </div>
          <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="quizProgressBar">
            <div class="progress-bar__fill" id="quizProgressFill" style="width:0%"></div>
          </div>
        </div>

        <!-- Question card — rendered by JS -->
        <div id="quizCard" class="quiz-card"></div>
      </div>

      <!-- Result panel -->
      <div id="quizResult" style="display:none" role="alert" aria-live="assertive">
        <div class="quiz-result">
          <div class="quiz-result__score" id="resultScore">0/5</div>
          <div class="quiz-result__label">soal dijawab dengan benar</div>
          <div class="quiz-result__best" id="resultBest"></div>
          <p class="quiz-result__message" id="resultMessage"></p>
          <div class="btn-group">
            <a href="games.php" class="btn btn--ghost">← Menu Game</a>
            <button class="btn btn--primary" id="btnUlangi">↺ Ulangi Kuis</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script type="module" src="assets/js/quiz.js"></script>
</body>
</html>
