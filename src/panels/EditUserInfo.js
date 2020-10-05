import React, { useState } from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Input from "@vkontakte/vkui/dist/components/Input/Input";

import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Switch from "@vkontakte/vkui/dist/components/Switch/Switch";

import bridge from "@vkontakte/vk-bridge";

import "./EditUserInfo.css";

import axios from ".././axios";

const osName = platform();

const EditUserInfo = (props) => {
  const [localUserInfo, setLocalUserInfo] = useState(props.userInfo || {});
  const [userStyle, setUserStyle] = useState("client_light");

  const localUpdateUserInfo = (newUserInfo) => async (e) => {
    props.setPopout(<ScreenSpinner size="large" />);
    await axios.post(`/partner/update${window.location.search}`, {
      design: newUserInfo.design,
      frontend: newUserInfo.frontend,
      backend: newUserInfo.backend,
      mobile: newUserInfo.mobile,
      desktop: newUserInfo.desktop,
      city: newUserInfo.city,
      website: newUserInfo.website,
      vk_id: newUserInfo.vk_id,
      first_name: newUserInfo.first_name,
      last_name: newUserInfo.last_name,
      photo: newUserInfo.photo,
      show_user: newUserInfo.show_user,
    });

    props.setPopout(null);
  };

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={props.go} data-to="search">
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Кто вы?
      </PanelHeader>
      <Group>
        <Div>
          <FormLayout>
            <Checkbox
              onChange={() => {
                setLocalUserInfo({
                  ...localUserInfo,
                  design: !localUserInfo.design,
                });
              }}
              data-string="design"
              checked={localUserInfo.design ? "checked" : ""}
            >
              Дизайнер
            </Checkbox>
            <Checkbox
              onChange={() => {
                setLocalUserInfo({
                  ...localUserInfo,
                  frontend: !localUserInfo.frontend,
                });
              }}
              data-string="frontend"
              checked={localUserInfo.frontend ? "checked" : ""}
            >
              Front-end разработчик
            </Checkbox>
            <Checkbox
              onChange={() => {
                setLocalUserInfo({
                  ...localUserInfo,
                  backend: !localUserInfo.backend,
                });
              }}
              data-string="backend"
              checked={localUserInfo.backend ? "checked" : ""}
            >
              Back-end разработчик
            </Checkbox>
            <Checkbox
              onChange={() => {
                setLocalUserInfo({
                  ...localUserInfo,
                  mobile: !localUserInfo.mobile,
                });
              }}
              data-string="mobile"
              checked={localUserInfo.mobile ? "checked" : ""}
            >
              Mobile разработчик
            </Checkbox>
            <Checkbox
              onChange={() => {
                setLocalUserInfo({
                  ...localUserInfo,
                  desktop: !localUserInfo.desktop,
                });
              }}
              data-string="desktop"
              checked={localUserInfo.desktop ? "checked" : ""}
            >
              Desktop разработчик
            </Checkbox>
            <Input
              onChange={(e) => {
                setLocalUserInfo({
                  ...localUserInfo,
                  website: e.currentTarget.value,
                });
              }}
              data-string="website"
              type="text"
              placeholder="Сайт-портфолио"
              value={localUserInfo.website}
            />
            {/* <Checkbox onChange={() => {setLocalUserInfo({...localUserInfo, show_user: !localUserInfo.show_user});}}  data-string="show_user" checked={localUserInfo.show_user ? "checked" : ""}>Показывать меня в списке</Checkbox> */}
            <Cell
              asideContent={
                <Switch
                  onChange={() => {
                    setLocalUserInfo({
                      ...localUserInfo,
                      show_user: !localUserInfo.show_user,
                    });
                  }}
                  data-string="show_user"
                  checked={localUserInfo.show_user ? "checked" : ""}
                />
              }
            >
              Показывать меня в списке
            </Cell>
            <Cell
              asideContent={
                <Switch
                  onChange={() => props.changeScheme( props.scheme, true )}
                  checked={props.scheme === "bright_light" ? "checked" : ""}
                />
              }
            >
              Выбрать тему
            </Cell>
            <Button
              onClick={localUpdateUserInfo(localUserInfo)}
              data-to="search"
              size="xl"
              mode="primary"
            >
              Сохранить
            </Button>
          </FormLayout>
        </Div>
      </Group>
    </Panel>
  );
};

EditUserInfo.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setPopout: PropTypes.func.isRequired,
  changeScheme: PropTypes.func.isRequired,
  scheme: PropTypes.string.isRequired
};

export default EditUserInfo;
