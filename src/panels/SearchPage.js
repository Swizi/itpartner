import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronRightOutline from "@vkontakte/icons/dist/28/chevron_right_outline";
import Icon24ChevronRight from "@vkontakte/icons/dist/24/chevron_right";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

import Search from "@vkontakte/vkui/dist/components/Search/Search";
import Icon28AddOutline from "@vkontakte/icons/dist/28/add_outline";
import Icon24AddOutline from "@vkontakte/icons/dist/24/add_outline";
import axios from ".././axios";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import Icon24Settings from "@vkontakte/icons/dist/24/settings";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon24UserOutline from "@vkontakte/icons/dist/24/user_outline";

import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import View from "@vkontakte/vkui/dist/components/View/View";

import Link from "@vkontakte/vkui/dist/components/Link/Link";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";

import "./SearchPage.css";
import { Document } from "mongoose";

const osName = platform();

const SearchPage = (props) => {
  const [activePanel, setActivePanel] = useState(props.id || null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);
  const [page, setPage] = useState(0);

  
  const [fullPartners, setFullPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);

  useEffect(() => {
    if (props.partners.length !== filteredPartners.length) {
      setLoading(true);
    }
    axios
      .get(`/partners/users${window.location.search}`, {
        params: { pageNum: page },
      })
      .then((response) => {
        var arrayPartners = response.data;
        arrayPartners.forEach(function (arrayPartner, i, arrayPartners) {
          if (arrayPartner.vk_id === props.userInfo.vk_id) {
            arrayPartners[i] = arrayPartners[0];
            arrayPartners[0] = props.userInfo;
          }
        });
        setFilteredPartners((prev) => [...prev, ...arrayPartners]);
        setFullPartners((prev) => [...prev, ...arrayPartners]);
        setLoading(false);
      });
  }, [page]);

  const partnersSearch = (e) => {
    var arrayPartners = filteredPartners;
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.activeModal === null) {
      var ex_partners = fullPartners;
      if (props.filterOptions.design === true) {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.design === true) {
            return ex_partners[i];
          }
        });
      }
      if (props.filterOptions.frontend === true) {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.frontend === true) {
            return ex_partners[i];
          }
        });
      }
      if (props.filterOptions.backend === true) {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.backend === true) {
            return ex_partners[i];
          }
        });
      }
      if (props.filterOptions.mobile === true) {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.mobile === true) {
            return ex_partners[i];
          }
        });
      }
      if (props.filterOptions.desktop === true) {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.desktop === true) {
            return ex_partners[i];
          }
        });
      }
      if (props.filterOptions.city !== "") {
        ex_partners = ex_partners.filter(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.city.id.toString() === props.filterOptions.city) {
            return ex_partners[i];
          }
        });
      }
      let i = 0;
      ex_partners.forEach(function (ex_partner, i, ex_partners) {
        if (ex_partner.vk_id === props.userInfo.vk_id) {
          ex_partners[i] = ex_partners[0];
          ex_partners[0] = props.userInfo;
        }
      });
      if (searchValue !== "") {
        var userVal = searchValue;
        userVal = userVal.replace(/\s/g, '');
        ex_partners = 
          ex_partners.filter(function (filteredPartner, i, arrayPartners) {
            var first_last_name = filteredPartner.first_name + filteredPartner.last_name;
            var last_first_name = filteredPartner.last_name + filteredPartner.first_name;
            if (
              !(
                filteredPartner.first_name
                  .toLowerCase()
                  .indexOf(userVal.toLowerCase()) === -1
              ) ||
              !(
                filteredPartner.last_name
                  .toLowerCase()
                  .indexOf(userVal.toLowerCase()) === -1
              ) ||
              !(
                first_last_name
                  .toLowerCase()
                  .indexOf(userVal.toLowerCase()) === -1
              ) ||
              !(
                last_first_name
                  .toLowerCase()
                  .indexOf(userVal.toLowerCase()) === -1
              )
            ) {
              return arrayPartners[i];
            }
          })
      }
      setFilteredPartners(ex_partners);
    }
  }, [props.activeModal, searchValue]);


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - Math.trunc(scrollTop) === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <Panel id={props.id} style={{ overflowY: "hidden" }}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => props.setActiveModal("filters")}>
            {osName === IOS ? <Icon28AddOutline /> : <Icon24AddOutline />}
          </PanelHeaderButton>
        }
      >
        Поиск партнёра
      </PanelHeader>
      <FormLayout>
        <Search value={searchValue} onChange={partnersSearch} after={null} />
      </FormLayout>
      <Group
        onScroll={handleScroll}
        id="content"
        style={{ overflowY: "scroll", height: "calc(100vh - 133px)" }}
      >
        <Div>
          {filteredPartners.map((partner, index) => (
            <RichCell
              key={index}
              disabled
              multiline
              style={{
                display:
                  partner.show_user === true ||
                  partner.vk_id === props.userInfo.vk_id
                    ? "flex"
                    : "none",
              }}
              after={
                partner.vk_id === props.userInfo.vk_id ? (
                  osName === IOS ? (
                    <Icon28SettingsOutline
                      data-to="user_info"
                      onClick={props.go}
                    />
                  ) : (
                    <Icon24Settings data-to="user_info" onClick={props.go} />
                  )
                ) : null
              }
              before={<Avatar size={72} src={partner.photo} />}
              text={
                <Link
                  style={{
                    display: partner.website !== "" ? "block" : "none",
                  }}
                  href={`${
                    partner.website !== "" ? `https://${partner.website}` : ""
                  }`}
                  target="_blank"
                >
                  Сайт-портфолио
                </Link>
              }
              caption={`${partner.design ? "Дизайн" : ""} ${
                partner.frontend ? "Фронтенд" : ""
              } ${partner.backend ? "Бэкэнд" : ""} ${
                partner.mobile ? "Мобайл" : ""
              } ${partner.desktop ? "Десктоп" : ""}`}
              actions={
                <React.Fragment>
                  <Button
                    mode="primary"
                    href={`https://vk.com/id${partner.vk_id}`}
                    target="__blank"
                  >
                    Зайти в вк
                  </Button>
                </React.Fragment>
              }
            >
              {partner.first_name} {partner.last_name}{" "}
              {partner.vk_id === props.userInfo.vk_id
                ? partner.show_user
                  ? "(Виден всем)"
                  : "(Виден только Вам)"
                : null}
            </RichCell>
          ))}
          {loading && <Spinner size="medium" style={{ marginTop: 20 }} />}
        </Div>
      </Group>
    </Panel>
  );
};

SearchPage.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  partners: PropTypes.array.isRequired,
  setPartners: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  filterOptions: PropTypes.object.isRequired,
};

export default SearchPage;
