import React from 'react';
import style from './Button.module.scss';
import arrowDelete from '../../assets/arrow_delete.svg';
import multiply from '../../assets/multiply.svg';

const Button = ({
	icon,
	value,
	operation,
	setOperation,
	setFirstOperand,
	setSecondOperand,
	firstOperand,
	secondOperand,
	setResult,
}) => {
	const onEraseButtonClick = () => {
		if (firstOperand && !secondOperand && operation === 'cleared') {
			firstOperand = firstOperand.split('');
			let erase = firstOperand.pop();
			return setFirstOperand(firstOperand.join(''));
		} else if (operation && secondOperand) {
			secondOperand = secondOperand.split('');
			let erase = secondOperand.pop();
			return setSecondOperand(secondOperand.join(''));
		}
	};

	const onPercentButtonClick = () => {
		setOperation('percent');
	};

	const onOperationButtonClick = (value) => {
		switch (value) {
			case 'cleared':
				setFirstOperand('');
				setSecondOperand('');
				setOperation(value);
				break;
			case 'equals':
				switch (operation) {
					case 'plus':
						setResult('');
						setResult(Number(firstOperand) + Number(secondOperand));

						break;
					case 'minus':
						setResult('');
						setResult(Number(firstOperand) - Number(secondOperand));

						break;
					case 'divide':
						setResult('');
						setResult(Number(firstOperand) / Number(secondOperand));

						break;
					case 'multiply':
						setResult('');
						setResult(Number(firstOperand) * Number(secondOperand));
						break;
					case 'percent':
						setResult('');
						if (!secondOperand) {
							setFirstOperand((prev) => prev / 100);
							setResult(firstOperand);
						} else if (secondOperand && operation === 'percent') {
							setResult((Number(firstOperand) / 100) * secondOperand);
						}

					default:
						console.log('Wrong operation');
						break;
				}

			default:
				if (operation === 'equals') {
					setSecondOperand('');
				}

				setOperation(value);
				break;
		}
	};

	const onNumButtonClick = (value) => {
		switch (operation) {
			case 'erase':
				if (secondOperand) {
				}
			case 'cleared':
				switch (value) {
					case '.':
						if (firstOperand && !firstOperand.includes('.')) {
							setFirstOperand((prev) => prev + '.');
						} else if (!firstOperand) {
							setFirstOperand('0.');
						}
						break;
					default:
						if (!firstOperand && value !== '0' && value !== '00') {
							setFirstOperand(value);
						} else if ((value === '0' || value === '00') && !firstOperand) {
							setFirstOperand('');
						} else if (firstOperand) {
							setFirstOperand((prev) => prev + value);
						}
				}
				break;
			default:
				if (secondOperand && secondOperand !== '0') {
					if (!secondOperand.includes('.')) {
						setSecondOperand((prev) => prev + value);
					} else if (secondOperand !== '0' && value === '.') {
						setSecondOperand((prev) => prev);
					} else {
						setSecondOperand((prev) => prev + value);
					}
				} else if (value === '0' || value === '00') {
					setSecondOperand('0');
				} else if (secondOperand === '' && value === '.') {
					setSecondOperand('0.');
				} else {
					setSecondOperand(value);
				}
				break;
		}
	};

	switch (icon) {
		//NUMBER BUTTONS
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		case '00':
		case ',': {
			return (
				<div className={style.button} onClick={() => onNumButtonClick(value)}>
					{icon}
				</div>
			);
		}
		//OPERATION BUTTONS
		case 'C':
		case '/':
		case '+':
		case '-':
		case '=':
		case 'percent': {
			return (
				<div
					className={style.operationButton}
					onClick={() => onOperationButtonClick(value)}
				>
					{icon}
				</div>
			);
		}
		case 'multiply': {
			return (
				<div className={style.operationButton}>
					<img
						src={multiply}
						alt="mulitply"
						onClick={() => onOperationButtonClick(value)}
					/>
				</div>
			);
		}
		case 'arrowDelete': {
			return (
				<div className={style.operationButton} onClick={onEraseButtonClick}>
					<img src={arrowDelete} alt="arrowDelete" />
				</div>
			);
		}
		case '%': {
			return (
				<div className={style.operationButton} onClick={onPercentButtonClick}>
					{icon}
				</div>
			);
		}
		default: {
		}
	}
};

export default Button;
