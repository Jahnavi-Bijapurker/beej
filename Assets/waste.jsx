import React from "react";
import {
  SideBarContainer,
  SideBarButton,
  Navbar,
  LogoWrapper,
  Logo,
  LogoText,
  SideTabWrapper,
  TopWrapper,
  BottomWrapper,
  TabWrapper,
  IconWrap,
  TabTextWrapper,
  Text,
  RoundIconWrapper,
  SubContentWrapper,
  SubWrapper,
  DotWrapper,
  DotIcon,
  SubTextWrapper,
} from "./AdminSidebarStyle";
import {
  DashboardIcon,
  FoundersIcon,
  InvestorsIcon,
  StartupIcon,
  HomePageIcon,
  LogoutIcon,
  MessageIcon,
  NotificationIcon,
} from "../../../Assets/icons.jsx";
import "./AdminSidebar.scss";
import { useState } from "react";
import BeejLogo from "../../../Assets/beejLogo.png";
import { FaBars } from "react-icons/fa";

const IconContainer = ({ children, isActive }) => {
  return <IconWrap isActive={isActive}>{children}</IconWrap>;
};

const TextContainer = ({ children }) => {
  return <Text>{children}</Text>;
};



const SingleTab = ({ item, isActive, Close, handleClick }) => {
  return (
    <TabWrapper isActive={isActive} onClick={handleClick}>
      <IconContainer isActive={isActive}>{item.icon()}</IconContainer>
      <TabTextWrapper Close={Close}>
        <TextContainer>{item.name}</TextContainer>
        {/* {item.isNotifiTab && (
          <NotificationContainer
            notifiNumber={item.notifiNumber}
            color={item.notifiColor}
          />
        )} */}
      </TabTextWrapper>
    </TabWrapper>
  );
};

const SingleCollapsable = ({ item, isActive, Close, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickFunction = () => {
    setIsOpen(!isOpen);
    handleClick();
  };

  return (
    <div>
      <TabWrapper isActive={isActive} onClick={handleClickFunction}>
        <IconContainer isActive={isActive}>{item.icon()}</IconContainer>
        <TabTextWrapper Close={Close}>
          <TextContainer>{item.name}</TextContainer>
          <RoundIconWrapper isOpen={isOpen}>
            {/* <IoChevronBackOutline /> */}
          </RoundIconWrapper>
        </TabTextWrapper>
      </TabWrapper>
      <SubContentWrapper isOpen={isOpen}>
        {item.subItems.map((o, idx) => (
          <SubWrapper>
            <DotWrapper isLast={idx === item.subItems.length - 1}>
              <DotIcon />
            </DotWrapper>
            <SubTextWrapper Close={Close}>
              <TextContainer>{o.subName}</TextContainer>
              {o.notifiNumber === 0 ? (
                <LogoutIcon color={"#6EE1A1"} />
              ) : (
                <span>{o.notifiNumber}</span>
              )}
            </SubTextWrapper>
          </SubWrapper>
        ))}
      </SubContentWrapper>
    </div>
  );
};
const AdminSidebar = () => {
  const [Close, setClose] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleSidebarView = () => {
    setClose(!Close);
  };

  const handleActive = (id) => {
    setActiveTab(id);
  };

  const TabList1 = [
    {
      id: 1,
      name: "Dashboard",
      icon: DashboardIcon,
    },
    {
      id: 2,
      name: "Founders",
      icon: FoundersIcon,
    },
    {
      id: 3,
      name: "Investors",
      icon: InvestorsIcon,
    },
    {
      id: 4,
      name: "Startups",
      icon: StartupIcon,
    },
    {
      id: 5,
      name: "HomePage",
      icon: HomePageIcon,
    },
  ];

  return (
    <>
      <div className="dashboard">
        <div className="sidebar">
          <SideBarContainer Close={Close}>
            <SideBarButton onClick={handleSidebarView} Close={Close}>
              <img src={LogoutIcon} alt="" style={{ width: "100%" }} />
            </SideBarButton>
            <LogoWrapper>
              <Logo>{Close ? <FaBars /> : <img src={BeejLogo} alt="" />}</Logo>
              <LogoText Close={Close}>
                {/* <span>Infinity</span>Space */}
              </LogoText>
            </LogoWrapper>
            <SideTabWrapper>
              <TopWrapper>
                {TabList1.map((o) =>
                  o.subItems ? (
                    <SingleCollapsable
                      item={o}
                      Close={Close}
                      isActive={activeTab === o.id}
                      handleClick={() => handleActive(o.id)}
                    />
                  ) : (
                    <SingleTab
                      item={o}
                      Close={Close}
                      isActive={activeTab === o.id}
                      handleClick={() => handleActive(o.id)}
                    />
                  )
                )}
              </TopWrapper>
            </SideTabWrapper>
            {/* <DashboardIcon/> */}
          </SideBarContainer>
        </div>
        <div className="nav">
          <Navbar Close={Close} className="nav-style">
            <div className="nav-head">
              <h2>Overview</h2>
            </div>
            <div className="nav-icons">
              <MessageIcon />
              <NotificationIcon />
            </div>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
