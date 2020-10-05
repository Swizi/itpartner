import React, { useState, useEffect } from "react";
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
import Switch from "@vkontakte/vkui/dist/components/Switch/Switch";

import "./StartChoosePage.css";

const osName = platform();

const StartChoosePage = (props) => {
  const [localUserInfo, setLocalUserInfo] = useState(props.userInfo || {});

  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={props.go} data-to="home">
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
            {/* <Checkbox onChange={() => {setLocalUserInfo({...localUserInfo, show_user: !localUserInfo.show_user});}} data-string="show_user" checked={localUserInfo.show_user ? "checked" : ""}>Показывать меня в списке</Checkbox> */}
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
            <Button
              onClick={
                localUserInfo.design ||
                localUserInfo.frontend ||
                localUserInfo.backend ||
                localUserInfo.mobile || 
                localUserInfo.desktop
                  ? props.createUser(localUserInfo)
                  : null
              }
              data-to="search"
              size="xl"
              mode="primary"
              style={{
                opacity:
                  localUserInfo.design ||
                  localUserInfo.frontend ||
                  localUserInfo.backend ||
                  localUserInfo.mobile ||
                  localUserInfo.desktop
                    ? "1"
                    : "0.6",
              }}
            >
              Далее
            </Button>
          </FormLayout>
        </Div>
      </Group>
    </Panel>
  );
};

StartChoosePage.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  partners: PropTypes.array.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setActivePanel: PropTypes.func.isRequired
};

export default StartChoosePage;
