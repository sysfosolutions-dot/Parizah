import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OutsideClickHandler from 'react-outside-click-handler';
import AccountContext from '../../Context/Account';

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const {Currency, setcurrency} = useContext(AccountContext);
  const [openCurrency, setOpenCurrency] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const handleSelect = (language) => setSelectedLanguage(language);
  const img_URL = import.meta.env.BASE_URL;


  return (
    <div className="tf-topbar bg-light-green topbar-bg">
      <div className="container">
        <div className="topbar-wraper">
          <div className="d-none d-xl-block flex-shrink-0">
            <ul className="tf-social-icon topbar-left">
              <li><a href="https://www.facebook.com/" className="social-item social-facebook"><i className="icon icon-fb" /></a></li>
              <li><a href="https://www.instagram.com/" className="social-item social-instagram"><i className="icon icon-instagram" /></a></li>
              <li><a href="https://x.com/" className="social-item social-x"><i className="icon icon-x" /></a></li>
              <li><a href="https://www.snapchat.com/" className="social-item social-snapchat"><i className="icon icon-snapchat" /></a></li>
            </ul>
          </div>

          <div className="overflow-hidden">
            <div className="topbar-center marquee-wrapper">
              <div className="initial-child-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="marquee-child-item"><p>Return extended to 60 days</p></div>
                    <div className="marquee-child-item"><span className="dot"></span></div>
                    <div className="marquee-child-item"><p>Life-time Guarantes</p></div>
                    <div className="marquee-child-item"><span className="dot"></span></div>
                    <div className="marquee-child-item"><p>Limited-Time Offer</p></div>
                    <div className="marquee-child-item"><span className="dot"></span></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="d-none d-xl-block flex-shrink-0">
            <div className="topbar-right">
              {/* Language Dropdown */}
              <div className="tf-languages bg-transparent">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret className="bg-transparent p-0 border-0">
                    {selectedLanguage}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleSelect('English')}>English</DropdownItem>
                    <DropdownItem onClick={() => handleSelect('العربية')}>العربية</DropdownItem>
                    <DropdownItem onClick={() => handleSelect('简体中文')}>简体中文</DropdownItem>
                    <DropdownItem onClick={() => handleSelect('اردو')}>اردو</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              {/* Currency Dropdown with Outside Click Handler */}
              <div className="tf-currencies">
                <OutsideClickHandler onOutsideClick={() => setOpenCurrency(false)}>
                  <div className="dropdown bootstrap-select image-select center style-default type-currencies">
                    <button
                      onClick={() => setOpenCurrency(!openCurrency)}
                      type="button"
                      className="btn dropdown-toggle btn-light"
                    >
                      <div className="filter-option">
                        <div className="filter-option-inner">
                          <div className="filter-option-inner-inner d-flex justify-content-end" style={{ width: '170px' }}>
                            <img src={`${import.meta.env.BASE_URL}/assets/Images/${Currency?.ImgURL}`} alt="flag" />
                            <span> {Currency?.CurrencyName}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                    {openCurrency && (
                      <div className="dropdown-menu show" style={{ position: 'absolute', transform: 'translate3d(0px, 20px, 0px)', maxHeight: '213px', overflow: 'hidden', minHeight: '148px' }}>
                        <div className="inner show" style={{ maxHeight: '183px', overflowY: 'auto', minHeight: '118px' }}>
                          <ul className="dropdown-menu inner show" style={{ marginTop: '0px', marginBottom: '0px' }}>
                            <li className="selected active">
                              <a className="dropdown-item  selected" onClick={()=> { setcurrency({Symbol:'₹', CurrencyName:'Indian (Rupee ₹)', ImgURL:'country/indian-flag.png'}); setOpenCurrency(false)}}>
                                <span className="text"><img src={`${img_URL}/assets/Images/country/indian-flag.png`} alt="US" />Indian (Rupee ₹)</span>
                              </a>
                            </li>
                             <li className="selected active">
                              <a className="dropdown-item selected" onClick={()=> { setcurrency({Symbol:'$', CurrencyName:'United States (USD $)', ImgURL:'country/us.png'}); setOpenCurrency(false)}}>
                                <span className="text"><img src={`${img_URL}/assets/Images/country/us.png`} alt="US" /> United States (USD $)</span>
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" onClick={()=> { setcurrency({Symbol:'€', CurrencyName:'France (EUR €)', ImgURL:'country/fr.png'}); setOpenCurrency(false)}} >
                                <span className="text"><img src={`${img_URL}/assets/Images/country/fr.png`} alt="FR"  /> France (EUR €)</span>
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" onClick={()=> {setcurrency({Symbol:'€' ,CurrencyName:'Germany (EUR €)', ImgURL:'country/ger.png'}); setOpenCurrency(false)}}>
                                <span className="text"><img src={`${img_URL}/assets/Images/country/ger.png`} alt="GER"  /> Germany (EUR €)</span>
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" onClick={()=> { setcurrency({Symbol:'₫' ,CurrencyName:'Vietnam (VND ₫)', ImgURL:'country/vn.png'}); setOpenCurrency(false)}}>
                                <span className="text"><img src={`${img_URL}/assets/Images/country/vn.png`} alt="VN"  /> Vietnam (VND ₫)</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
