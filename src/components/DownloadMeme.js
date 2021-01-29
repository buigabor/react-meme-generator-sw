import styled from 'styled-components';

export const Button = styled.button`
	font-family: Hack, monospace;
	background: #fff;
	color: #2c2c2c;
	cursor: pointer;
	font-size: 1.2em;
	padding: 0.8rem;
	border: 0;
	transition: all 0.5s;
	border-radius: 10px;
	width: auto;
	position: relative;
	width: 10rem;

	&:hover {
		background: #2b2bff;
		transition: all 0.5s;
		border-radius: 10px;
		box-shadow: 0px 6px 15px #0000ff61;
		color: #ffffff;
		&::after {
			opacity: 1;
			transition: all 0.5s;
			color: #ffffff;
		}
	}
`;

export default function DownloadMeme({ memeUrl }) {
	const download = () => {
		fetch(memeUrl, {
			method: 'GET',
			headers: {},
		})
			.then((response) => {
				response.arrayBuffer().then(function (buffer) {
					const url = window.URL.createObjectURL(new Blob([buffer]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'image.png'); //or any other extension
					document.body.appendChild(link);
					link.click();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className='App'>
			<Button
				style={{ visibility: memeUrl ? 'visible' : 'hidden' }}
				download
				onClick={(e) => download(e)}
			>
				Download
			</Button>
		</div>
	);
}
