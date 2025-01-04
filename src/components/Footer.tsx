import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Info = styled.span`
  opacity: 0.5;
  font-size: 12px;
`;

export default function Footer() {
  return (
    <Wrapper>
      <InfoBox>
        <Info>
          무비플릭스서비시스코리아 유한회사 통신판매업신고번호:
          제2025-코딩로-01호
        </Info>
        <Info>전화번호: 0000-0000-0000 (수신자 부담)</Info>
        <Info>대표: 우리집 코딩러</Info>
        <Info>이베일 주소: coding@movieflix.com</Info>
        <Info>
          주소: 대한민국 코딩시 코딩구 코딩로, 코딩아파트 코딩동 코딩호
        </Info>
        <Info>사업자등록번호: 000-00-00000</Info>
        <Info>클라우드 호스팅: 우리집</Info>
        <Info>공정거래위원회 웹 사이트</Info>
      </InfoBox>
    </Wrapper>
  );
}
