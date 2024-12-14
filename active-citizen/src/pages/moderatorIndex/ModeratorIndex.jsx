import { useState, useEffect } from 'react'
import Search from '../../components/search/Search'
import Header from '../../components/header/Header'
import ModeratorAppeal from '../../components/moderatorAppeal/ModeratorAppeal'
import './moderatorIndex.css'
import Filter from '../../components/filter/Filter'
import { API_URL } from '../../constants'
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox'

function ModeratorIndex() {
    const accessToken = localStorage.getItem('accessToken');
    const appeals = [
        {
            id: 1,
            status: 'Ожидает проверки',
            title: 'Кривая дорога',
            category: 'Название категории',
            subcategory: 'подкатегория 1',
            user: 'Аа Бб Вв',
            rating: '4.3',
            current_number: '1',
            time: '10:15',
            date: '17.02.2024',
            comment: '-',
        },
        {
            id: 2,
            status: 'Ожидает проверки',
            title: 'Очень кривая дорога',
            category: 'Второе название категории',
            subcategory: 'подкатегория 1',
            user: 'Аа Бб Вв',
            rating: '4.3',
            current_number: '1',
            time: '10:15',
            date: '17.03.2024',
            comment: '-',
        },
        {
            id: 3,
            status: 'Отклонено',
            title: 'Жесть кривая дорога',
            category: 'Название категории',
            subcategory: 'подкатегория 1',
            user: 'Аа Бб Вв',
            rating: '4.3',
            current_number: '1',
            time: '10:16',
            date: '17.03.2024',
            comment: '-',
        },
    ];

    const [filteredAppeals, setFilteredAppeals] = useState(appeals);
    const [categories, setCategories] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(['Все категории']);
    const [sortOrder, setSortOrder] = useState('Сначала новые');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/categories/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(['Все категории', ...data.map((cat) => cat.title)]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchResults = (results) => {
        setFilteredAppeals(results);
    };

    const parseDateTime = (date, time) => {
        const [day, month, year] = date.split('.').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const sortByDate = (data) => {
        return data.slice().sort((a, b) => {
            const dateA = parseDateTime(a.date, a.time);
            const dateB = parseDateTime(b.date, b.time);
            return sortOrder === 'Сначала новые' ? dateB - dateA : dateA - dateB;
        });
    };

    const filterByStatus = (data) => {
        if (selectedStatuses.length === 0) return data;
        return data.filter((item) => selectedStatuses.includes(item.status));
    };

    const filterByCategory = (data) => {
        if (selectedCategories.includes('Все категории')) return data;
        return data.filter((item) => selectedCategories.includes(item.category));
    };

    const getProcessedData = () => {
        const searchedData = filteredAppeals;
        const statusFiltered = filterByStatus(searchedData);
        const categoryFiltered = filterByCategory(statusFiltered);
        return sortByDate(categoryFiltered);
    };

    const processedData = getProcessedData();

    const handleStatusFilterChange = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const handleCategoryFilterChange = (category) => {
        if (category === 'Все категории') {
            setSelectedCategories(['Все категории']);
        } else {
            setSelectedCategories((prev) => {
                const newCategories = prev.includes(category)
                    ? prev.filter((cat) => cat !== category)
                    : [...prev.filter((cat) => cat !== 'Все категории'), category];
                return newCategories.length === 0 ? ['Все категории'] : newCategories;
            });
        }
    };

    return (
        <div className="App app_moderator">
            <Header />
            <section className="page_content moderator_page moderator_index">
                <ul className="moderator_appeal-list">
                    {processedData.map((appeal) => (
                        <li key={appeal.id} className="moderator_appeal-list__item">
                            <ModeratorAppeal appeal={appeal} />
                        </li>
                    ))}
                </ul>
                <div className="moderator_appeal-filters">
                    <Search
                        list={appeals}
                        onResults={handleSearchResults}
                        placeholder="Поиск по теме"
                    />
                    <Filter
                        defaultText="Сначала новые"
                        options={['Сначала новые', 'Сначала старые']}
                        onSelect={(selected) => setSortOrder(selected)}
                    />
                    <div className="moderator_status-filter moderator_checkbox-filter">
                        <p className='moderator_checkbox-filter__title'>Статус</p>
                        {['Ожидает проверки', 'Одобрено', 'Отправлено на доработку', 'Отклонено'].map((status) => (
                            <CustomCheckbox 
                                label={status}
                                onChangeFunction={() => handleStatusFilterChange(status)}
                                selected = {selectedStatuses}
                            />
                        ))}
                    </div>
                    <div className="moderator_category-filter moderator_checkbox-filter">
                        <p className='moderator_checkbox-filter__title'>Категории</p>
                        {categories.map((category) => (
                            <CustomCheckbox 
                                label={category}
                                onChangeFunction={() => handleCategoryFilterChange(category)}
                                selected = {selectedCategories}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ModeratorIndex;
