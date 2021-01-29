import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './DownloadMeme';

const SubmitButton = styled(Button)`
	padding: 0.5rem 0.3rem;
	width: 7rem;
	border-radius: 8px;
	font-size: 1.1em;
	align-self: flex-end;
`;

const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 15px;
`;

const Input = styled.input`
	border: 0;
	width: 16rem;
	height: 100%;
	padding: 10px 20px;
	background: white;
	border-radius: 3px;
	box-shadow: 0px 8px 15px rgba(75, 72, 72, 0.1);
	transition: all 0.4s ease;
	&:focus {
		outline: none;
	}
`;

const Select = styled.select`
	border: 0;
	width: 18.5rem;
	height: 100%;
	padding: 10px 20px;
	background: white;
	border-radius: 3px;
	box-shadow: 0px 8px 15px rgba(75, 72, 72, 0.1);
	transition: all 0.4s ease;
	&:focus {
		outline: none;
	}
`;
const Label = styled.label`
	align-self: flex-start;
`;

export default function MemeInput({
	setMemeUrl,
	memeTemplates,
	setClicked,
	clicked,
}) {
	const [slug, setSlug] = useState();

	function replaceStrToSymbol(str) {
		const hashtag = { value: '#', sub: '~h' };
		const questionMark = { value: '?', sub: '~q' };
		const slash = { value: '/', sub: '~s' };

		str = str.replaceAll(hashtag.value, hashtag.sub);
		str = str.replaceAll(questionMark.value, questionMark.sub);
		str = str.replaceAll(slash.value, slash.sub);
		return str;
	}

	return (
		<>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					let topText = document.getElementById('top-text').value;
					let bottomText = document.getElementById('bottom-text').value;
					topText = replaceStrToSymbol(topText);
					bottomText = replaceStrToSymbol(bottomText);

					let memeUrl = `https://api.memegen.link/images/${slug}/${topText}/${bottomText}.png`;
					const memeData = { topText, bottomText, memeUrl, photoType: '.png' };
					localStorage.setItem(
						`${slug}-${topText}-${bottomText}`,
						JSON.stringify(memeData),
					);

					setMemeUrl(memeUrl);

					setClicked(true);
					setTimeout(() => {
						setClicked(false);
					}, 1000);
				}}
			>
				<Label htmlFor='topText'>Top Text</Label>
				<Input
					type='text'
					name='top-text'
					id='top-text'
					placeholder='Top text'
				/>
				<Label htmlFor='topText'>Bottom Text</Label>
				<Input
					type='text'
					name='bottom-text'
					id='bottom-text'
					placeholder='Bottom text'
				/>
				<Label htmlFor='slug'>Meme Slug Name</Label>

				<Select
					defaultValue={'DEFAULT'}
					name='slug'
					id='slug'
					onChange={() => {
						const selectedValue = document.getElementById('slug').value;
						setSlug(selectedValue);
						const blackMemeUrl = memeTemplates.find((meme) => {
							return meme.key === selectedValue;
						}).blank;
						setMemeUrl(blackMemeUrl);
					}}
				>
					<option value='DEFAULT' disabled>
						Select a meme!
					</option>
					{memeTemplates
						.sort(function (a, b) {
							if (a.name < b.name) {
								return -1;
							}
							if (a.name > b.name) {
								return 1;
							}
							return 0;
						})
						.map((meme) => {
							return (
								<option key={meme.key} value={meme.key}>
									{meme.name}
								</option>
							);
						})}
				</Select>
				<SubmitButton type='submit' disabled={clicked ? true : false}>
					Submit
				</SubmitButton>
			</Form>
		</>
	);
}
