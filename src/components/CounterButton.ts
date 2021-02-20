import styled from 'styled-components'

export const CounterButton = styled.button`
	--base-rgb-accent: 92, 243, 250;
	position: absolute;
	top: 0;
	width: 50%;
	height: 100%;
	background: none;
	border: none;

	:focus:not(:focus-visible),
	:focus-visible {
		outline: none;
	}

	::before,
	::after {
		position: absolute;
		pointer-events: none;
	}
	::before {
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		place-items: center;
		text-align: center;
		background: linear-gradient(
			to var(--gradient-direction, right),
			rgba(var(--base-rgb-accent), 0.25),
			rgba(var(--base-rgb-accent), 0)
		);
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	::after {
		top: 50%;
		transform: translateY(-50%);
		font-size: 3rem;
		color: rgba(var(--base-rgb-accent), 0.25);
		transition: color 0.2s ease, opacity 0.2s ease;
	}
	&[disabled]::after {
		opacity: 0;
	}
	:not([disabled]):hover,
	:focus-visible {
		::before {
			opacity: 1;
		}
		::after {
			color: rgba(var(--base-rgb-accent), 0.5);
		}
	}
	:nth-of-type(1) {
		left: 0;
		padding-left: 2rem;
		:focus-visible {
			box-shadow: -2px -2px 0px rgb(var(--base-rgb-accent)), -2px 2px 0px rgb(var(--base-rgb-accent));
		}
		::before {
			--gradient-direction: right;
		}
		::after {
			content: '+';
			left: 25%;
		}
	}
	:nth-of-type(2) {
		right: 0;
		padding-right: 2rem;
		:focus-visible {
			box-shadow: 2px 2px 0px rgb(var(--base-rgb-accent)), 2px -2px 0px rgb(var(--base-rgb-accent));
		}
		::before {
			--gradient-direction: left;
		}
		::after {
			content: '-';
			right: 25%;
		}
	}
`
