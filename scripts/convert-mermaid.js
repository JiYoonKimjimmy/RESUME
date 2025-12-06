const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPTS_DIR = __dirname; // scripts 디렉토리
const IMAGES_DIR = path.join(__dirname, '../images');

// images 디렉토리 확인
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * Mermaid .mmd 파일을 이미지로 변환
 */
function convertMermaidToImage(mmdFilePath, outputPath) {
  try {
    // mermaid-cli를 사용하여 이미지 생성
    // PNG 형식으로 생성 (SVG도 가능: -f svg)
    const command = `npx -y @mermaid-js/mermaid-cli -i "${mmdFilePath}" -o "${outputPath}" -b white`;
    execSync(command, { stdio: 'inherit' });
    
    console.log(`✓ 이미지 생성 완료: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ 이미지 생성 실패: ${error.message}`);
    return false;
  }
}

/**
 * .mmd 파일명을 기반으로 이미지 파일명 생성
 */
function generateImageFilename(mmdFilename) {
  // .mmd 확장자를 .png로 변경
  return mmdFilename.replace(/\.mmd$/, '.png');
}

/**
 * .mmd 파일 처리
 */
function processMmdFile(mmdFilePath) {
  const mmdFilename = path.basename(mmdFilePath);
  console.log(`\n처리 중: ${mmdFilename}`);
  
  // 이미지 파일명 생성 (.mmd 파일명 기반)
  const imageFilename = generateImageFilename(mmdFilename);
  const imagePath = path.join(IMAGES_DIR, imageFilename);
  
  // 이미지 생성
  const success = convertMermaidToImage(mmdFilePath, imagePath);
  
  if (success) {
    console.log(`  ✓ 완료: ${imageFilename}`);
  }
  
  return success;
}

/**
 * 메인 함수
 */
function main() {
  console.log('Mermaid 이미지 변환 스크립트 시작\n');
  console.log(`scripts 디렉토리: ${SCRIPTS_DIR}`);
  
  // scripts 디렉토리의 모든 .mmd 파일 찾기
  const mmdFiles = fs.readdirSync(SCRIPTS_DIR)
    .filter(file => file.endsWith('.mmd'))
    .map(file => path.join(SCRIPTS_DIR, file));
  
  if (mmdFiles.length === 0) {
    console.log('처리할 .mmd 파일이 없습니다.');
    return;
  }
  
  console.log(`${mmdFiles.length}개의 .mmd 파일을 찾았습니다.`);
  
  let successCount = 0;
  let failCount = 0;
  
  // 각 .mmd 파일 처리
  mmdFiles.forEach(mmdFilePath => {
    try {
      const success = processMmdFile(mmdFilePath);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`파일 처리 중 오류 발생 (${path.basename(mmdFilePath)}):`, error.message);
      failCount++;
    }
  });
  
  console.log('\n=== 작업 완료 ===');
  console.log(`성공: ${successCount}개`);
  if (failCount > 0) {
    console.log(`실패: ${failCount}개`);
  }
}

// 스크립트 실행
main();
