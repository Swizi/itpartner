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

import "./StartChoosePage.css";

const osName = platform();

const StartChoosePage = (props) => {

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
            <Checkbox onChange={props.changeUserInfo} data-string="designer" checked={props.userInfo.designer ? "checked" : ""}>Дизайнер</Checkbox>
            <Checkbox onChange={props.changeUserInfo} data-string="frontend" checked={props.userInfo.frontend ? "checked" : ""}>Front-end разработчик</Checkbox>
            <Checkbox onChange={props.changeUserInfo} data-string="backend" checked={props.userInfo.backend ? "checked" : ""}>Back-end разработчик</Checkbox>
            <Button
              onClick={props.userInfo.designer || props.userInfo.frontend || props.userInfo.backend ? props.go : null}
              data-to="search"
              size="xl"
              mode="primary"
              style={{opacity: props.userInfo.designer || props.userInfo.frontend || props.userInfo.backend ? "1" : "0.6"}}
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
};

export default StartChoosePage;
