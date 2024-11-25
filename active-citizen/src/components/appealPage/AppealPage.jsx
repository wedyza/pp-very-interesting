import './appealPage.css'
import Header from './../header/Header'
import { useParams } from 'react-router-dom'
import BackButton from '../backButton/BackButton'
import { Link } from 'react-router-dom'
import empty from './../../img/empty.jpg'

function AppealPage () {
    const { appealId } = useParams();
    console.log(appealId);
    const appeals = [
        {
            id: '0',
            title: 'Кривая дорога',
            category: 'Развитие социальной среды',
            subcategory: 'Плохая организация работы соц служб',
            datetime: '10:15, 17.09.2024',
            desc: 'Хотел бы выразить недовольство состоянием дорог в нашем районе. Они в ужасном состоянии: ямы, ухабы и кривизна — это не только неудобно, но и опасно. Машины постоянно повреждаются, а водителям приходится маневрировать, чтобы избежать аварий. Особенно это касается участков рядом с пешеходными переходами — тут нужно быть предельно осторожным. Кроме того, общественный транспорт страдает от этого: автобусы и маршрутки задерживаются, и людям приходится ждать дольше обычного. Прошу вас обратить внимание на эту проблему и сделать что-то с дорогами. Мы заслуживаем нормальных условий для передвижения!',
            place: 'г. Екатеринбург ул. Малышева д 13',
            images: '',
            comment: 'Недопустимые материалы',
        },
        {
            id: '1',
            title: 'Мусорка упала',
            category: 'Развитие социальной среды',
            subcategory: 'Плохая организация работы соц служб',
            datetime: '11:15, 17.09.2024',
            desc: 'Мусорка упала!',
            place: 'г. Екатеринбург ул. Малышева д 13',
            images: '',
            comment: 'Недопустимые материалы',
        },
        {
            id: '2',
            title: 'Настроение плохое',
            category: 'Развитие социальной среды',
            subcategory: 'Плохая организация работы соц служб',
            datetime: '11:15, 18.09.2024',
            desc: 'Сегодня пасмурно, мне грустно! Исправьте!',
            place: 'г. Екатеринбург ул. Малышева д 13',
            images: '',
            comment: 'Не исправим АХАХАХХА',
        },
    ];
    const appeal = appeals.find((a) => a.id === appealId);

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <Link to={'/notifications'}>
                    <BackButton />
                </Link>
                <h1 className='notifications__title text-title'>Ваше обращение</h1>
                <div className="appeal-info">
                    <div className="appeal-info__item appeal-info__theme">
                        <div className="appeal-info__item_label">
                            Тема
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.title}
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__category">
                        <div className="appeal-info__item_label">
                            Категория
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.category}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__subcategory">
                        <div className="appeal-info__item_label">
                            Подкатегория
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.subcategory}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__datetime">
                        <div className="appeal-info__item_label">
                            Дата и время заявки
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.datetime}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__desc">
                        <div className="appeal-info__item_label">
                            Описание
                        </div>
                        <div className="appeal-info__item_value appeal-desc__value">
                            {appeal.desc}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__images">
                        <div className="appeal-info__item_label">
                            Медиафайлы
                        </div>
                        <div className="appeal-info__item_value appeal__images">
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__comm">
                        <div className="appeal-info__item_label">
                            Комментарии предыдущих модераторов
                        </div>
                        <div className="appeal-info__item_value appeal-comm__value">
                            <p className='appeal__comm_label'>Комментарий модератора:</p>
                            {appeal.comment}                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AppealPage