import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: gray;
	border-radius: 20px;
	width: 16rem;
	display: flex;
	margin: auto 0;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	overflow: auto;
	height: 400px;
	margin-top: 3rem;
	margin-left: 3.5rem;
	padding: 1.5rem 1rem;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
		rgba(0, 0, 0, 0.3) 0px 18px 36px;
`;

const MemeDiv = styled.div`
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	width: 180px;
	height: 150px;
	padding: 10px;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SpanCache = styled.span`
	color: #39ff14;
	padding-bottom: 1rem;
	font-size: 1.5em;
	font-weight: 400;
`;

const Span = styled.span`
	color: black;
	font-size: 0.8em;
	margin-bottom: 4px;
`;
export default function CachedData() {
	function allStorage() {
		let values = [],
			keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			values.push(JSON.parse(localStorage.getItem(keys[i])));
		}

		return values;
	}

	let local = allStorage();
	console.log(local);
	return (
		<Wrapper>
			<SpanCache>Cached Data</SpanCache>
			{local.map((meme) => {
				return (
					<MemeDiv key={meme.memeUrl}>
						<Span>Top text: {meme.topText}</Span>
						<Span>Bottom text: {meme.bottomText}</Span>
						<Span>Photo type: {meme.photoType}</Span>
						<img
							src={meme.memeUrl}
							style={{ width: 70, height: 70, objectFit: 'cover' }}
							alt=''
						/>
					</MemeDiv>
				);
			})}
		</Wrapper>
	);
}
