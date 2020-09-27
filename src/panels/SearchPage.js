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

import "./SearchPage.css";

const osName = platform();

const SearchPage = (props) => {
  const [activePanel, setActivePanel] = useState(props.id || null);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios.get("/partners/sync").then((response) => {
      props.setPartners(response.data);
    });
  }, [props.activeModal, searchValue]);

  const [filteredPartners, setFilteredPartners] = useState(
    props.partners || []
  );

  const partnersSearch = (e) => {
    var arrayPartners = filteredPartners;
    setSearchValue(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setFilteredPartners(
        arrayPartners.filter(function (filteredPartner, i, arrayPartners) {
          if (
            !(
              filteredPartner.first_name
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) === -1
            ) ||
            !(
              filteredPartner.last_name
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) === -1
            )
          ) {
            return arrayPartners[i];
          }
        })
      );
    } else {
      setFilteredPartners(props.partners || []);
    }
    // setFilteredPartners(ex_partners);
  };

  useEffect(() => {
    if (props.activeModal === null) {
      var ex_partners = props.partners || [];
      if (props.filterOptions.design === true) {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.design !== true) {
            delete ex_partners[i];
          }
        });
      }
      if (props.filterOptions.frontend === true) {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.frontend !== true) {
            delete ex_partners[i];
          }
        });
      }
      if (props.filterOptions.backend === true) {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.backend !== true) {
            delete ex_partners[i];
          }
        });
      }
      if (props.filterOptions.mobile === true) {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.mobile !== true) {
            delete ex_partners[i];
          }
        });
      }
      if (props.filterOptions.desktop === true) {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.desktop !== true) {
            delete ex_partners[i];
          }
        });
      }
      if (props.filterOptions.city !== "") {
        ex_partners.forEach(function (filteredPartner, i, ex_partners) {
          if (filteredPartner.city.id.toString() !== props.filterOptions.city) {
            delete ex_partners[i];
          }
        });
      }
      setFilteredPartners(ex_partners);
      // if ((ex_partners) && (filterOptions.design || filterOptions.frontend || filterOptions.backend)){
      //   setfilteredPartners(ex_partners);
      //   console.log(ex_partners);
      // }
      // if (
      //   !(
      //     props.filterOptions.design ||
      //     props.filterOptions.frontend ||
      //     props.filterOptions.backend
      //   )
      // ) {
      //   setFilteredPartners(props.partners || []);
      // }
    }
  }, [props.activeModal]);

  return (
    <Panel id={props.id}>
      <PanelHeader
        // right={
        //   <PanelHeaderButton onClick={props.go} data-to="search_options">
        //     {osName === IOS ? <Icon28AddOutline /> : <Icon24AddOutline />}
        //   </PanelHeaderButton>
        // }
        left={
          <PanelHeaderButton onClick={() => props.setActiveModal("filters")}>
            {osName === IOS ? <Icon28AddOutline /> : <Icon24AddOutline />}
          </PanelHeaderButton>
        }
        // right={
        //   <PanelHeaderButton data-to="user_info" onClick={props.go}>
        //     {osName === IOS ? <Icon28UserOutline /> : <Icon24UserOutline />}
        //   </PanelHeaderButton>
        // }
      >
        Поиск партнёра
      </PanelHeader>
      <FormLayout>
        <Search value={searchValue} onChange={partnersSearch} after={null} />
      </FormLayout>
      <Group>
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
              // text="Держи за обед в EZO"
              caption={`${partner.design ? "Дизайн" : ""} ${
                partner.frontend ? "Фронтенд" : ""
              } ${partner.backend ? "Бэкэнд" : ""} ${
                partner.mobile ? "Мобайл" : ""
              } ${partner.desktop ? "Десктоп" : ""}`}
              // after="+ 1 500 ₽"
              actions={
                <React.Fragment>
                  <Button
                    mode="primary"
                    href={`https://vk.com/id${partner.vk_id}`}
                    target="__blank"
                  >
                    Зайти в вк
                  </Button>
                  {/* <Button
                    mode="secondary"
                    style={{ opacity: partner.website != "" ? "1" : "0.6" }}
                    href={`${
                      partner.website != "" ? `https://${partner.website}` : ""
                    }`}
                    target="__blank"
                  >
                    Зайти на сайт
                  </Button> */}
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
  filterOptions: PropTypes.object.isRequired
};

export default SearchPage;
