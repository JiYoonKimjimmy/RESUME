# RESUME
## `Jekyll` 을 활요한 개발 이력서 제작
> [Jekyll - modern resume theme](https://github.com/sproogen/modern-resume-theme)

### `Jekyll` 설치 방법 또는 구동 방법은 아래 링크 참고
> [Jimmyberg's Blog README](https://github.com/JiYoonKimjimmy/JiYoonKimjimmy.github.io/blob/main/README.md)

---

## Preview

#### WEB Style

![WEB Style](/images/web_style.png)

#### PDF Style

![PDF Style](/images/pdf_style.png)

---

## Mermaid 다이어그램 이미지 변환

프로젝트 내에서 Mermaid 코드 블록을 이미지로 변환하는 스크립트를 제공합니다.

### 사용 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **Mermaid 이미지 변환 실행**
   ```bash
   npm run convert-mermaid
   ```

스크립트는 `_data/` 디렉토리의 모든 YAML 파일을 검색하여 Mermaid 코드 블록을 찾고, 각 다이어그램을 PNG 이미지로 변환하여 `images/` 디렉토리에 저장합니다. 원본 YAML 파일의 Mermaid 코드 블록은 자동으로 이미지 링크로 교체되며, 원본 파일은 `.backup` 확장자로 백업됩니다.

### 주의사항

- 변환 전에 Git에 변경사항을 커밋하는 것을 권장합니다.
- 백업 파일(`*.backup`)은 필요시 수동으로 삭제하거나 `.gitignore`에 의해 무시됩니다.
- 이미지 파일은 `images/` 디렉토리에 저장되며 Git에 커밋해야 합니다.

---
