// 실제 작품 정보는 아래 PROJECTS 배열에서 수정하세요.
const PROJECTS = [
  { title: "잠깐의 쉼표", kind: "PERSONAL WORK / CHARACTER ACTING", description: "[임시 설명] 캐릭터가 잠시 멈춰 숨을 고르는 순간을 담은 짧은 연기 애니메이션입니다. 이곳에 기획 의도와 작업 과정, 어려웠던 점을 적어주세요.", role: "기획 · 원화 · 애니메이션", tools: "클립 스튜디오 페인트, 프리미어 프로", duration: "[제작 기간 입력]", media: "assets/work-01.gif" },
  { title: "창가의 오후", kind: "PERSONAL WORK / LOOP ANIMATION", description: "[임시 설명] 오후의 빛과 작은 움직임을 반복 장면으로 표현한 작품입니다. 러프, 타이밍 조정, 최종본 등 작업 과정을 추가해보세요.", role: "기획 · 애니메이션 · 편집", tools: "클립 스튜디오 페인트, 포토샵", duration: "[제작 기간 입력]", media: "assets/work-02.mp4" },
  { title: "꽃이 피는 타이밍", kind: "PERSONAL WORK / KEY ANIMATION", description: "[임시 설명] 움직임의 간격과 타이밍에 집중한 짧은 애니메이션입니다. 본인의 실제 담당 범위와 작품의 배경을 적어주세요.", role: "기획 · 키 애니메이션", tools: "클립 스튜디오 페인트, 프리미어 프로", duration: "[제작 기간 입력]", media: "assets/work-03.gif" }
];

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  nav.classList.toggle("open", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.setAttribute("aria-label", "메뉴 열기");
}));

const dialog = document.querySelector(".project-dialog");
const media = document.querySelector("#dialog-media");
document.querySelectorAll(".work-card").forEach(card => card.addEventListener("click", () => {
  const project = PROJECTS[Number(card.dataset.project)];
  document.querySelector("#dialog-kind").textContent = project.kind;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-description").textContent = project.description;
  document.querySelector("#dialog-role").textContent = project.role;
  document.querySelector("#dialog-tools").textContent = project.tools;
  document.querySelector("#dialog-duration").textContent = project.duration;
  media.replaceChildren();
  const path = project.media;
  if (/\.mp4($|\?)/i.test(path)) {
    const video = document.createElement("video"); video.src = path; video.controls = true; video.playsInline = true; video.setAttribute("aria-label", `${project.title} 영상`); media.append(video);
  } else {
    const image = document.createElement("img"); image.src = path; image.alt = `${project.title} 애니메이션`; image.onerror = () => { media.textContent = "작품 파일 임시 영역 — script.js의 media 경로에 GIF 또는 MP4 파일을 연결하세요."; }; media.append(image);
  }
  dialog.showModal();
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
