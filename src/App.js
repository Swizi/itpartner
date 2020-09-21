import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import StartChoosePage from './panels/StartChoosePage';
import SearchPage from './panels/SearchPage';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [userInfo, setUserInfo] = useState({
		designer: false,
		frontend: false,
		backend: false,
		website: ""
	});
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const changeUserInfo = e => {
    const ex_obj = {
      designer: userInfo.designer,
      frontend: userInfo.frontend,
      backend: userInfo.backend,
      website: userInfo.website,
    }
    
    if (e.currentTarget.dataset.string === "designer"){
      ex_obj.designer = !ex_obj.designer;
      setUserInfo(ex_obj)
    }
    if (e.currentTarget.dataset.string === "frontend"){
      ex_obj.frontend = !ex_obj.frontend;
      setUserInfo(ex_obj)
    }
    if (e.currentTarget.dataset.string === "backend"){
      ex_obj.backend = !ex_obj.backend;
      setUserInfo(ex_obj)
    }
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<StartChoosePage id='start_choose_page' go={go} userInfo={userInfo} changeUserInfo={changeUserInfo} />
			<SearchPage id="search" go={go} />
		</View>
	);
}

export default App;

