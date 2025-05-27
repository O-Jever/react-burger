import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import './styles.css';

export const AppHeader = () => {
    return (<>
        <header className='text ml-10 mr-10 mt-10 pt-4 pb-4 app-header'>
            <div className='app-header-content'>
                <div style={{display: 'flex'}}>
                    <button className='header-buttons pl-5 pr-5 mr-2'>
                        <BurgerIcon type={'primary'} />
                        Конструктор
                    </button>
                    <button className='header-buttons pl-5 pr-5 text_color_inactive'>
                        <ListIcon type={'secondary'} />
                        Лента заказов
                    </button>
                </div>
                <Logo />
                <button className='header-buttons pl-30 pr-5 text_color_inactive'>
                    <ProfileIcon type={'secondary'} />
                    Личный кабинет
                </button>
            </div>
        </header>

    </>);
};

{/* <nav class="menu">
  <ul>
    <li><a href="#">Главная</a></li>
    <li><a href="#">О нас</a></li>
    <li><a href="#">Контакты</a></li>
  </ul>
</nav> */}
