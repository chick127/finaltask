// src/data/customRepos.ts (새로 생성할 파일)

export interface CustomRepoDetail {
  name: string // GitHub 레포지토리 이름과 일치해야 함 (예: project-a)
  fullDescription: string // 페이지 소개에 사용될 상세 설명
  siteUrl?: string // 배포된 사이트 링크 (선택 사항)
  imageUrl?: string
}

// GitHub 레포지토리 이름과 매칭되는 사용자 정의 데이터
export const customRepoData: CustomRepoDetail[] = [
  {
    name: 'ably-mall', // (예: 사용자의 GitHub 레포지토리 이름 중 하나)
    fullDescription:
      '이 프로젝트는 쇼핑몰 사이트로, 로그인 기능과 상품 목록을 포함하고 있습니다.',
    siteUrl: 'https://ably-mall-rho.vercel.app/', // 실제 배포된 사이트 주소
    imageUrl: '/ably-mall.png',
  },
  {
    name: 'clerk-app-2',
    fullDescription:
      '이 프로젝트는 저장소 기능, 구글과 깃허브 로그인 기능을 구현한 clerk app 사이트입니다.',
    siteUrl: 'https://clerk-app-2-five.vercel.app/',
    imageUrl: '/clerk-app.png',
  },
  {
    name: 'crud-2',
    fullDescription:
      'mongoDB를 이용한 프로젝트로 로그인 기능과 댓글 기능이 구현되어있습니다.',
    siteUrl: 'https://crud-2-ten.vercel.app/',
    imageUrl: '/crud-2.png',
  },
  {
    name: 'crud-action',
    fullDescription:
      'mongoDB를 이용한 프로젝트로 로그인 기능과 댓글 기능이 구현되어있고, 여기에 action 기능이 추가되었습니다.',
    siteUrl: 'https://crud-action-bay.vercel.app/',
    imageUrl: '/crud-action.png',
  },
  {
    name: 'final-task',
    fullDescription: '1학기 기말 개인 프로젝트입니다.',
    siteUrl: 'https://final-task-xi.vercel.app/',
    imageUrl: '/final-task.png',
  },
  {
    name: 'final-team-task',
    fullDescription: '1학기 기말 팀 프로젝트입니다.',
    siteUrl: 'https://final-team-task.vercel.app/',
    imageUrl: '/final-team-task.png',
  },
  {
    name: 'finaltask',
    fullDescription: '2학기 기말 개인 프로젝트입니다.',
    siteUrl: 'https://finaltask-olju.vercel.app/',
    imageUrl: '/finaltask.png',
  },
  {
    name: 'hcjdemo',
    fullDescription: 'html, css, js를 이용한 웹데모 프로젝트입니다.',
  },
  {
    name: 'messenger-main',
    fullDescription: '암호학 팀 프로젝트로, 실시간 암호화 채팅 프로그램입니다.',
  },
  {
    name: 'middle-portfolio',
    fullDescription:
      '2학기 중간고사 개인 프로젝트로, Next.js와 Tailwind CSS를 사용한 포트폴리오 사이트입니다.',
    siteUrl: 'https://middle-portfolio.vercel.app/',
    imageUrl: '/finaltask.png',
  },
  {
    name: 'My-homepage',
    fullDescription: '1학기 중간 개인 프로젝트입니다.',
    siteUrl: 'https://my-homepage-self.vercel.app/',
    imageUrl: '/myhomepage.png',
  },
  {
    name: 'python-crypto-2025',
    fullDescription:
      '암호학 수업 때 배운 코드들입니다. 다양한 암호화 알고리즘이 구현되어 있습니다.',
  },
  {
    name: 'school',
    fullDescription:
      '학교에 관한 사이트입니다. 시간표가 구현되어있고, 정보보호학과에 대한 소개와 간단한 로그인, 회원가입 기능이 있습니다.',
    siteUrl: 'https://school-iota-nine.vercel.app/',
    imageUrl: '/school.png',
  },
  {
    name: 'school-supporter',
    fullDescription: '2학기 기말 팀 프로젝트로, 학교 정보 도움 사이트입니다.',
    siteUrl: 'https://school-supporter-eight.vercel.app/',
    imageUrl: '/school-supporter.png',
  },
  {
    name: 'team-project',
    fullDescription: '1학기 팀 프로젝트 입니댜.',
    siteUrl: 'https://team-project-lemon.vercel.app/',
    imageUrl: '/team-project.png',
  },
  {
    name: 'test',
    fullDescription: '처음 next.js를 이용한 간단한 프로젝트입니다.',
    siteUrl: 'https://test-one-gray-94.vercel.app/',
    imageUrl: '/test.png',
  },
  {
    name: 'WebDemo1',
    fullDescription: 'html, css, js를 이용한 웹데모 프로젝트입니다.',
    siteUrl: 'https://web-demo1-lac.vercel.app/',
    imageUrl: '/webdemo1.png',
  },
]

// 레포지토리 이름으로 커스텀 데이터를 찾아주는 함수
export function getCustomRepoDetail(
  repoName: string
): CustomRepoDetail | undefined {
  return customRepoData.find((r) => r.name === repoName)
}
