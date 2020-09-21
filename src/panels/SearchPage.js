import React from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import Search from '@vkontakte/vkui/dist/components/Search/Search';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import "./SearchPage.css";

const osName = platform();

const SearchPage = (props) => (
  <Panel id={props.id}>
    <PanelHeader
      // left={
      //   <PanelHeaderButton onClick={props.go} data-to="start_choose_page">
      //     {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
      //   </PanelHeaderButton>
      // }
      right={<PanelHeaderButton><Icon28AddOutline /></PanelHeaderButton>}
    >
      Поиск партнёра
    </PanelHeader>
    <Search />
  </Panel>
);

SearchPage.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default SearchPage;
