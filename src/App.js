import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import CachedData from './components/CachedData';
import DownloadMeme from './components/DownloadMeme';
import GenerateMeme from './components/GenerateMeme';
import MemeInput from './components/MemeInput';

const memeTemplateURL = 'https://api.memegen.link/templates';

const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	grid-area: 'form';
	margin-left: 2rem;
	font-family: Hack, monospace;
`;

const StyledGrid = styled.div`
	height: 100vh;
	background-color: #dddddd;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	grid-template-areas: '
form image cache
';
`;

const ImageWrapper = styled.div`
	grid-area: 'image';
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 14px;
`;

const Title = styled.h1`
	color: #2c2c2c;
	font-size: 3em;
	position: absolute;
	left: 1.5rem;
	font-family: Hack, monospace;
	&:hover {
		color: #2b2bff;
		transition: all 0.5s;
	}
`;

function App() {
	const [memeTemplates, setMemeTemplates] = useState([]);
	const [memeUrl, setMemeUrl] = useState();
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		axios
			.get(memeTemplateURL)
			.then((res) => setMemeTemplates(res.data))
			.catch((err) => console.log(err));
	}, []);
	// console.log(memeTemplates);
	return (
		<>
			<Title>
				Meme <br />
				Generator
			</Title>
			<StyledGrid>
				<FormWrapper>
					<MemeInput
						memeTemplates={memeTemplates}
						setMemeUrl={setMemeUrl}
						memeUrl={memeUrl}
						setClicked={setClicked}
						clicked={clicked}
					/>
				</FormWrapper>
				<ImageWrapper>
					<GenerateMeme memeUrl={memeUrl} />
					<DownloadMeme memeUrl={memeUrl} />
				</ImageWrapper>
				<CachedData setMemeUrl={setMemeUrl} />
			</StyledGrid>
		</>
	);
}

export default App;
