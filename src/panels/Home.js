import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";

const Home = ({
  id,
  go,
  fetchedUser,
  partners,
  userInfo,
  setUserInfo,
  setActivePanel
}) => {
  // useEffect(() => {
  // 	partners.forEach(function (partner, i, partners) {
  // 	  if (partner.vk_id === userInfo.vk_id) {
  // 		setUserInfo(partner);
  // 		setActivePanel("search");
  // 	  }
  // 	});
  //   }, [partners, userInfo]);

  return (
    <Panel id={id}>
      <PanelHeader>Партнёр в Айти</PanelHeader>
      {fetchedUser && (
        <Group title="User Data Fetched with VK Bridge">
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            description={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group
        title="Navigation"
        style={{
          marginTop: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text weight="medium" style={{ marginBottom: 16 }}>
            Хотите найти разработчика или дизайнера в свой проект?
          </Text>
          <Button mode="primary" onClick={go} data-to="start_choose_page">
            Хочу
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  partners: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  setActivePanel: PropTypes.func.isRequired
};

export default Home;
