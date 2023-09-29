import React from "react";

import styled from "styled-components";

function Footer() {
  return (
    <>
      <FooterBar>
        <FooterContent>
          <div>
            <p>NEO HACK 2023</p>
          </div>
        </FooterContent>
      </FooterBar>
    </>
  );
}

const FooterContent = styled.footer`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 86%;
  margin: 0 auto;
  height: 139px;
  margin-top: -128px;
`;

const FooterBar = styled.div`
  background-color: #a773fa;
`;

export default Footer;
