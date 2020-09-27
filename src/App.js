import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";
import { platform, IOS } from "@vkontakte/vkui";

import Home from "./panels/Home";
import StartChoosePage from "./panels/StartChoosePage";
import SearchPage from "./panels/SearchPage";
import EditUserInfo from "./panels/EditUserInfo";
import Pusher from "pusher-js";
import axios from "./axios";

import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Select from "@vkontakte/vkui/dist/components/Select/Select";

const osName = platform();

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    design: false,
    frontend: false,
    backend: false,
    mobile: false,
    desktop: false,
    city: {},
    website: "",
    vk_id: 0,
    first_name: "",
    last_name: "",
    photo: "",
    show_user: true,
  });
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [partners, setPartners] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    design: false,
    frontend: false,
    backend: false,
    mobile: false,
    desktop: false,
    city: ""
  });
  // useEffect(() => {setPopout(<ScreenSpinner size="large" />)}, [activePanel]);

  // useEffect(() => {
  // }, [userInfo]);

  useEffect(() => {
    const pusher = new Pusher("c9562e8ed2d754281bd6", {
      cluster: "eu",
      useTLS: true,
    });

    const channel = pusher.subscribe("partners");
    channel.bind("inserted", (newPartner) => {
      // alert(JSON.stringify(newPartner));
      setPartners([...partners, newPartner]);
    });

    channel.bind("updated", (updatedPartner) => {
      let newPartners = partners.filter(function (currentPartner) {
        if (currentPartner.vk_id != updatedPartner.vk_id) {
          return currentPartner;
        }
      });
      setPartners([...newPartners, updatedPartner]);
    });
    // channel.bind("updated", (newPartners) => {
    //   setPartners(newPartners);
    // });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [partners]);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      console.log(user);
      setUser(user);
      const ex_obj = {
        design: userInfo.design,
        frontend: userInfo.frontend,
        backend: userInfo.backend,
        mobile: userInfo.mobile,
        desktop: userInfo.desktop,
        website: userInfo.website,
        vk_id: userInfo.vk_id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        photo: userInfo.photo,
        show_user: userInfo.show_user,
      };
      ex_obj.vk_id = user.id;
      ex_obj.first_name = user.first_name;
      ex_obj.last_name = user.last_name;
      ex_obj.photo = user.photo_100;
      ex_obj.city = user.city;
      setUserInfo(ex_obj);
      await axios.get("/partners/sync").then((response) => {
        setPartners(response.data);
        response.data.forEach(function (partner, i, partners) {
          if (partner.vk_id === user.id) {
            setUserInfo(partner);
            setActivePanel("search");
          }
        });
      });
      setPopout(null);
    }

    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const createUser = (newUserInfo) => async (e) => {
    setPopout(<ScreenSpinner size="large" />);

    setUserInfo(newUserInfo);

    await axios.post("/partners/new", {
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
    setActivePanel("search");
    setPopout(null)
  };

  // const updateUserInfo = ( newUserInfo ) => async ( e ) => {
  //   setPopout(true);

  //   setUserInfo(newUserInfo);

  //   await axios.post("/partner/update", {
  //     design: newUserInfo.design,
  //     frontend: newUserInfo.frontend,
  //     backend: newUserInfo.backend,
  //     website: newUserInfo.website,
  //     vk_id: newUserInfo.vk_id,
  //     first_name: newUserInfo.first_name,
  //     last_name: newUserInfo.last_name,
  //     photo: newUserInfo.photo,
  //     show_user: newUserInfo.show_user,
  //   });
  //   setPopout(null);
  // };

  const changeUserInfo = (e) => {
    const ex_obj = userInfo;

    if (e.currentTarget.dataset.string === "design") {
      ex_obj.design = !ex_obj.design;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "frontend") {
      ex_obj.frontend = !ex_obj.frontend;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "backend") {
      ex_obj.backend = !ex_obj.backend;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "mobile") {
      ex_obj.mobile = !ex_obj.mobile;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "desktop") {
      ex_obj.desktop = !ex_obj.desktop;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "show_user") {
      ex_obj.show_user = !ex_obj.show_user;
      setUserInfo(ex_obj);
    }
    if (e.currentTarget.dataset.string === "website") {
      ex_obj.website = e.currentTarget.value;
      setUserInfo(ex_obj);
    }
  };
  // console.log(userInfo);

  var partnersCities = [];
  partners.forEach(function (partner, i, partners) {
    let partnersCitiesIds = [];
    partnersCities.forEach(function (partnerCity, i, partnersCities_ex){
      partnersCitiesIds.push(partnerCity.id);
    });
    if (!(partnersCitiesIds.includes(partner.city.id))){
      partnersCities.push(partner.city)
    }
  });

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalPage
        id="filters"
        dynamicContentHeight
        header={
          <ModalPageHeader
            right={
              osName === IOS && (
                <PanelHeaderButton onClick={() => setActiveModal(null)}>
                  Готово
                </PanelHeaderButton>
              )
            }
          >
            Фильтры
          </ModalPageHeader>
        }
        settlingHeight={80}
        onClose={() => setActiveModal(null)}
      >
        <FormLayout>
          <FormLayoutGroup top="Профессия">
            <Checkbox
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  design: !filterOptions.design,
                })
              }
              checked={filterOptions.design ? "checked" : ""}
            >
              Дизайнер
            </Checkbox>
            <Checkbox
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  frontend: !filterOptions.frontend,
                })
              }
              checked={filterOptions.frontend ? "checked" : ""}
            >
              Front-end разработчик
            </Checkbox>
            <Checkbox
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  backend: !filterOptions.backend,
                })
              }
              checked={filterOptions.backend ? "checked" : ""}
            >
              Back-end разработчик
            </Checkbox>
            <Checkbox
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  mobile: !filterOptions.mobile,
                })
              }
              checked={filterOptions.mobile ? "checked" : ""}
            >
              Mobile разработчик
            </Checkbox>
            <Checkbox
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  desktop: !filterOptions.desktop,
                })
              }
              checked={filterOptions.desktop ? "checked" : ""}
            >
              Desktop разработчик
            </Checkbox>
            <Select placeholder="Выберите город" value={filterOptions.city} onChange={(e) =>
                setFilterOptions({
                  ...filterOptions,
                  city: e.currentTarget.value,
                })
              }>
              {partnersCities.map((partnerCity, index) => (
                <option key={index} value={partnerCity.id}>{partnerCity.title}</option>
              ))}
            </Select>
          </FormLayoutGroup>
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <View activePanel={activePanel} popout={popout} modal={modal}>
      <Home
        id="home"
        fetchedUser={fetchedUser}
        go={go}
        partners={partners}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setActivePanel={setActivePanel}
        setPopout={setPopout}
      />
      <StartChoosePage
        id="start_choose_page"
        go={go}
        userInfo={userInfo}
        changeUserInfo={changeUserInfo}
        createUser={createUser}
        partners={partners}
        setUserInfo={setUserInfo}
        setActivePanel={setActivePanel}
      />
      <SearchPage
        id="search"
        go={go}
        userInfo={userInfo}
        setPartners={setPartners}
        partners={partners}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        filterOptions={filterOptions}
        setPopout={setPopout}
      />
      <EditUserInfo
        id="user_info"
        go={go}
        userInfo={userInfo}
        changeUserInfo={changeUserInfo}
        setUserInfo={setUserInfo}
        setPopout={setPopout}
      />
    </View>
  );
};

export default App;
