import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  ChevronDown,
  Plus,
  ArrowLeft
} from 'lucide-react';

// Компонент иконки BILLBOARD
const BillboardLogo = () => (
  <div className="flex items-center space-x-2 text-white font-bold text-xl">
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
      <span className="text-green-800 font-bold text-sm">DW</span>
    </div>
    <span>BILLBOARD</span>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'occupancy', 'construction-detail'
  const [selectedConstructionId, setSelectedConstructionId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    legalAddress: '',
    contactPerson1: '',
    phone1: '',
    unp1: '',
    contactPerson2: '',
    phone2: '',
    unp2: '',
    responsibleManager: '',
    advertisingAgency: false,
    brand: '',
    contactPerson: '',
    contactData: '',
    'янв 2025': '', 'фев 2025': '', 'мар 2025': '', 'апр 2025': '', 'май 2025': '', 'июн 2025': '',
    'июл 2025': '', 'авг 2025': '', 'сен 2025': '', 'окт 2025': '', 'ноя 2025': '', 'дек 2025': ''
  });

  const constructionsData = [
    {
      id: 1,
      light: 'С',
      city: 'Минск',
      format: '6x3',
      type: 'билборд',
      address: 'Шоссейная ул.',
      side: 'А',
      category: 'МТС',
      printMaterial: 'Баннер',
      occupancy: {
        'янв 2025': 'МТС',
        'фев 2025': 'Савушкин',
        'мар 2025': 'А1',
        'апр 2025': '',
        'май 2025': 'КФС',
        'июн 2025': '',
        'июл 2025': '',
        'авг 2025': '',
        'сен 2025': '',
        'окт 2025': '',
        'ноя 2025': '',
        'дек 2025': ''
      }
    },
    {
      id: 2,
      light: 'Н',
      city: 'Минск',
      format: '6x3',
      type: 'билборд',
      address: 'Железнодорожная ул. - Ленина ул. (по паспорту Заслонова ул. - Ленина ул.)',
      side: 'В',
      category: 'ФСН',
      printMaterial: 'Пленка',
      occupancy: {
        'янв 2025': '',
        'фев 2025': 'ФСН',
        'мар 2025': 'МТС',
        'апр 2025': 'МТС',
        'май 2025': '',
        'июн 2025': 'А1',
        'июл 2025': '',
        'авг 2025': '',
        'сен 2025': '',
        'окт 2025': '',
        'ноя 2025': '',
        'дек 2025': ''
      }
    },
    {
      id: 3,
      light: 'С',
      city: 'Жодино',
      format: '6x3',
      type: 'билборд',
      address: 'Молодежная ул., 166',
      side: 'В',
      category: 'А1',
      printMaterial: 'Баннер',
      occupancy: {
        'янв 2025': '',
        'фев 2025': '',
        'мар 2025': 'А1',
        'апр 2025': 'М1',
        'май 2025': 'М1',
        'июн 2025': '',
        'июл 2025': 'Савушкин',
        'авг 2025': '',
        'сен 2025': '',
        'окт 2025': '',
        'ноя 2025': '',
        'дек 2025': ''
      }
    },
    {
      id: 4,
      light: 'Н',
      city: 'Гродно',
      format: '6x3',
      type: 'билборд',
      address: 'Кгаторова ул. - Блохина ул.',
      side: 'В',
      category: 'МЧС',
      printMaterial: 'Сетка',
      occupancy: {
        'янв 2025': '',
        'фев 2025': '',
        'мар 2025': '',
        'апр 2025': 'МЧС',
        'май 2025': 'МЧС',
        'июн 2025': 'КФС',
        'июл 2025': '',
        'авг 2025': 'МТС',
        'сен 2025': '',
        'окт 2025': '',
        'ноя 2025': '',
        'дек 2025': ''
      }
    }
  ];

  const [selectedConstructions, setSelectedConstructions] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    status: '',
    type: '',
    light: '',
    format: '',
    address: ''
  });
  const [showClientForm, setShowClientForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [clientColor, setClientColor] = useState('#3b82f6');

  const [contacts, setContacts] = useState([
    { id: 1, name: '', phone: '' }
  ]);

  const addContact = () => {
    setContacts([...contacts, { id: contacts.length + 1, name: '', phone: '' }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (id, field, value) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const handleSubmit = () => {
    console.log('Данные формы:', formData);
    console.log('Контакты:', contacts);
    // Здесь будет логика сохранения
    alert('Клиент добавлен!');
    setCurrentView('list');
  };

  const handleConstructionSelect = (id) => {
    setSelectedConstructions(prev => 
      prev.includes(id) 
        ? prev.filter(constructionId => constructionId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedConstructions.length === constructionsData.length) {
      setSelectedConstructions([]);
    } else {
      setSelectedConstructions(constructionsData.map(c => c.id));
    }
  };

  const handleCreateProposal = () => {
    if (selectedConstructions.length === 0) {
      alert('Выберите конструкции для создания предложения');
      return;
    }
    setShowClientForm(true);
  };

  const months = ['янв 2025', 'фев 2025', 'мар 2025', 'апр 2025', 'май 2025', 'июн 2025', 'июл 2025', 'авг 2025', 'сен 2025', 'окт 2025', 'ноя 2025', 'дек 2025'];
  const monthNames: Record<string, string> = {
    'янв 2025': 'январь 2025',
    'фев 2025': 'февраль 2025',
    'мар 2025': 'март 2025',
    'апр 2025': 'апрель 2025',
    'май 2025': 'май 2025',
    'июн 2025': 'июнь 2025',
    'июл 2025': 'июль 2025',
    'авг 2025': 'август 2025',
    'сен 2025': 'сентябрь 2025',
    'окт 2025': 'октябрь 2025',
    'ноя 2025': 'ноябрь 2025',
    'дек 2025': 'декабрь 2025'
  };

  const handleConstructionClick = (id: number) => {
    setSelectedConstructionId(id);
    setCurrentView('construction-detail');
  };

  if (currentView === 'occupancy') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Левая боковая панель */}
        <aside className="w-64 bg-green-900 text-white flex-shrink-0">
          {/* Логотип */}
          <div className="p-6 border-b border-green-800">
            <BillboardLogo />
          </div>
          
          {/* Навигационное меню */}
          <nav className="mt-8">
            <div className="px-4">
              <div className="flex items-center justify-between py-3 px-4 bg-green-800 rounded-lg mb-2">
                <div className="flex items-center space-x-3">
                  <Menu className="w-5 h-5" />
                  <span className="font-medium">Конструкции</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>
              
              <div className="ml-4 space-y-1">
                <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  Список
                </div>
                <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer flex items-center justify-between">
                  <span>Добавить</span>
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Типы конструкций</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </div>
                
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Страницы</span>
                </div>
                
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Общие блоки</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 px-4">
              <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                <div className="w-5 h-5 border rounded"></div>
                <span>Настройки</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </div>
            </div>
          </nav>
        </aside>

        {/* Основное содержимое */}
        <div className="flex-1 flex flex-col">
          {/* Верхняя панель */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Хлебные крошки */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Application</span>
                <span>•</span>
                <span>Dashboard</span>
              </div>
              
              {/* Правая часть - поиск, уведомления, профиль */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Контент страницы */}
          <main className="flex-1 p-6">
            {/* Навигационные вкладки */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
                <button 
                  onClick={() => setCurrentView('list')}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md"
                >
                  Клиенты
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Список предложений
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Конструкции
                </button>
                <button className="px-6 py-2 bg-white text-gray-900 rounded-md font-medium shadow-sm">
                  Сводная Таблица
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Настройки
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Админ
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Выйти
                </button>
              </div>
            </div>
            
            {/* Заголовок страницы */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Адресная программа</h1>
              <p className="text-sm text-gray-600">(экран работы менеджера)</p>
            </div>

            {/* Фильтры */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-6 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                  <select 
                    value={filters.city}
                    onChange={(e) => setFilters({...filters, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Минск</option>
                    <option value="minsk">Минск</option>
                    <option value="grodno">Гродно</option>
                    <option value="zhodino">Жодино</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Свободен</option>
                    <option value="free">Свободен</option>
                    <option value="occupied">Занят</option>
                    <option value="reserved">Резерв</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value=""></option>
                    <option value="billboard">Билборд</option>
                    <option value="citylight">Ситилайт</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedConstructions.length === constructionsData.length}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Свет</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Город</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Формат</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип конструкции</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-80">Адресная программа</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сторона</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Материал печати</th>
                      {months.map(month => (
                        <th key={month} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-24">
                          <div className="flex flex-col items-center">
                            <span>{month}</span>
                            <select className="mt-1 text-xs border-0 bg-transparent">
                              <option value="">Все</option>
                              <option value="mts">МТС</option>
                              <option value="a1">А1</option>
                              <option value="savushkin">Савушкин</option>
                            </select>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {constructionsData.map((construction) => (
                      <tr
                        key={construction.id}
                        className={`hover:bg-gray-50 ${selectedConstructions.includes(construction.id) ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-3 py-4">
                          <input
                            type="checkbox"
                            checked={selectedConstructions.includes(construction.id)}
                            onChange={() => handleConstructionSelect(construction.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.light}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.city}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.format}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.type}</td>
                        <td
                          className="px-3 py-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                          onClick={() => handleConstructionClick(construction.id)}
                        >
                          {construction.address}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.side}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.category}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{construction.printMaterial}</td>
                        {months.map(month => (
                          <td key={month} className="px-3 py-4 text-center text-xs">
                            <div className={`px-2 py-1 rounded text-white text-xs ${
                              construction.occupancy[month] 
                                ? construction.occupancy[month] === 'МТС' ? 'bg-red-500' 
                                  : construction.occupancy[month] === 'А1' ? 'bg-orange-500'
                                  : construction.occupancy[month] === 'Савушкин' ? 'bg-green-500'
                                  : construction.occupancy[month] === 'ФСН' ? 'bg-blue-500'
                                  : construction.occupancy[month] === 'М1' ? 'bg-purple-500'
                                  : construction.occupancy[month] === 'МЧС' ? 'bg-yellow-600'
                                  : construction.occupancy[month] === 'KFC' ? 'bg-red-600'
                                  : 'bg-gray-500'
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              {construction.occupancy[month] || '—'}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            {/* Информация о выбранных конструкциях */}
            {selectedConstructions.length > 0 && (
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Выбрано: {selectedConstructions.length} конструкций
                  </span>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Название</label>
                      <input
                        type="text"
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Введите название"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Клиент</label>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                        <option value="">ОАО А1</option>
                        <option value="mts">МТС</option>
                        <option value="savushkin">Савушкин продукт</option>
                        <option value="a1">А1</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Цвет клиента</label>
                      <input
                        type="color"
                        value={clientColor}
                        onChange={(e) => setClientColor(e.target.value)}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Кнопка создания предложения */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleCreateProposal}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium"
              >
                Создать предложение
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (currentView === 'construction-detail' && selectedConstructionId) {
    const construction = constructionsData.find(c => c.id === selectedConstructionId);

    if (!construction) {
      setCurrentView('occupancy');
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex">
        <aside className="w-64 bg-green-900 text-white flex-shrink-0">
          <div className="p-6 border-b border-green-800">
            <BillboardLogo />
          </div>

          <nav className="mt-8">
            <div className="px-4">
              <div className="flex items-center justify-between py-3 px-4 bg-green-800 rounded-lg mb-2">
                <div className="flex items-center space-x-3">
                  <Menu className="w-5 h-5" />
                  <span className="font-medium">Конструкции</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Application</span>
                <span>•</span>
                <span>Dashboard</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="mb-6 flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('occupancy')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад к сводной таблице
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Детали конструкции</h1>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.address}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Город</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.city}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Формат</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.format}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тип конструкции</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.type}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сторона</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.side}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Свет</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.light}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.category}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Материал печати</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">{construction.printMaterial}</div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Сетка занятости на 2025 год</h2>
                <div className="grid grid-cols-4 gap-4">
                  {months.map(month => (
                    <div key={month} className="border border-gray-200 rounded p-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">{monthNames[month]}</div>
                      <div className={`px-3 py-2 rounded text-white text-sm text-center ${
                        construction.occupancy[month]
                          ? construction.occupancy[month] === 'МТС' ? 'bg-red-500'
                            : construction.occupancy[month] === 'А1' ? 'bg-orange-500'
                            : construction.occupancy[month] === 'Савушкин' ? 'bg-green-500'
                            : construction.occupancy[month] === 'ФСН' ? 'bg-blue-500'
                            : construction.occupancy[month] === 'М1' ? 'bg-purple-500'
                            : construction.occupancy[month] === 'МЧС' ? 'bg-yellow-600'
                            : construction.occupancy[month] === 'КФС' ? 'bg-red-600'
                            : 'bg-gray-500'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {construction.occupancy[month] || 'Свободно'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const clientsData = [
    {
      id: 1,
      name: 'ООО Рога и Шерсть',
      category: 'Питание',
      manager: 'Иванова Ирина',
      contact: 'Ирина Лебеденко',
      phone: '+ 375 123 123 123'
    },
    {
      id: 2,
      name: 'ОДО ТехноГроф',
      category: 'Лекарство',
      manager: 'Сидорова Светлана', 
      contact: 'Лебедева Татьяна',
      phone: '+ 375 123 123 123'
    },
    {
      id: 3,
      name: 'ЧУП Чоп',
      category: 'Мобильная связь',
      manager: 'Иваненко Сергей',
      contact: 'Васильев Иван', 
      phone: '+ 375 123 123 123'
    },
    {
      id: 4,
      name: 'ИП Иванов А.П.',
      category: 'Строительство',
      manager: 'Протас Павел',
      contact: 'Левицкий Алексей',
      phone: '+ 375 123 123 123'
    }
  ];

  if (currentView === 'add') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Левая боковая панель */}
        <aside className="w-64 bg-green-900 text-white flex-shrink-0">
          {/* Логотип */}
          <div className="p-6 border-b border-green-800">
            <BillboardLogo />
          </div>
          
          {/* Навигационное меню */}
          <nav className="mt-8">
            <div className="px-4">
              <div className="flex items-center justify-between py-3 px-4 bg-green-800 rounded-lg mb-2">
                <div className="flex items-center space-x-3">
                  <Menu className="w-5 h-5" />
                  <span className="font-medium">Конструкции</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>
              
              <div className="ml-4 space-y-1">
                <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  Список
                </div>
                <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer flex items-center justify-between">
                  <span>Добавить</span>
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Типы конструкций</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </div>
                
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Страницы</span>
                </div>
                
                <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                  <div className="w-5 h-5 border rounded"></div>
                  <span>Общие блоки</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 px-4">
              <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                <div className="w-5 h-5 border rounded"></div>
                <span>Настройки</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </div>
            </div>
          </nav>
        </aside>

        {/* Основное содержимое */}
        <div className="flex-1 flex flex-col">
          {/* Верхняя панель */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Хлебные крошки */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Application</span>
                <span>•</span>
                <span>Dashboard</span>
              </div>
              
              {/* Правая часть - поиск, уведомления, профиль */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Контент страницы */}
          <main className="flex-1 p-6">
            {/* Навигационные вкладки */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
                <button 
                  onClick={() => setCurrentView('list')}
                  className="px-6 py-2 bg-white text-gray-900 rounded-md font-medium shadow-sm"
                >
                  Клиенты
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Список предложений
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Конструкции
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Сводная Таблица
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Настройки
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Админ
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                  Выйти
                </button>
              </div>
            </div>

            {/* Заголовок с кнопкой назад */}
            <div className="mb-6 flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('list')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад к списку
              </button>
            </div>
            
            {/* Форма добавления клиента */}
            <div className="bg-white rounded-lg shadow p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Добавление нового клиента</h1>
              
              {/* Основная информация */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  ООО Савушкин продукт
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Наименование
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="text"
                      value={formData.phone1}
                      onChange={(e) => handleInputChange('phone1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Юр адрес
                    </label>
                    <input
                      type="text"
                      value={formData.legalAddress}
                      onChange={(e) => handleInputChange('legalAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      УНП
                    </label>
                    <input
                      type="text"
                      value={formData.unp1}
                      onChange={(e) => handleInputChange('unp1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Наименование
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Юр адрес
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      УНП
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ответственный менеджер
                    </label>
                    <input
                      type="text"
                      value={formData.responsibleManager}
                      onChange={(e) => handleInputChange('responsibleManager', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Сегмент рынка
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Питание</option>
                      <option>Лекарство</option>
                      <option>Мобильная связь</option>
                      <option>Строительство</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.advertisingAgency}
                      onChange={(e) => handleInputChange('advertisingAgency', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Рекламное агентство</span>
                  </label>
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Бренд
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Экспонента"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Контактные данные
                    </label>
                    <input
                      type="text"
                      value={formData.contactData}
                      onChange={(e) => handleInputChange('contactData', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Контактное лицо
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Контактные лица */}
              <div className="mb-8">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Добавить контактное лицо
                      </span>
                      {contacts.length > 1 && (
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Имя контактного лица"
                        value={contact.name}
                        onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Телефон"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={addContact}
                  className="flex items-center text-green-600 hover:text-green-800 mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить контактное лицо
                </button>
              </div>

              {/* Кнопка сохранения */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium"
                >
                  Обновить
                </button>
              </div>

              {/* Активные предложения */}
              <div className="mt-12">
                <div className="flex space-x-1 mb-6">
                  <button className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium">
                    Активные Предложения
                  </button>
                  <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                    История заказов
                  </button>
                </div>

                {/* Таблица предложений */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата предложения</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Размещение</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Стоимость</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бронь</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Менеджер</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12 января 2022</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>Жодино</div>
                          <div>Минск</div>
                          <div>Минск</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>378</div>
                          <div>399</div>
                          <div>250</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>Бронь</div>
                          <div>Бронь</div>
                          <div>Бронь</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">Ольга Карапузова</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Кнопка создать предложение */}
                <div className="flex justify-center mt-6">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium">
                    Создать предложение
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Левая боковая панель */}
      <aside className="w-64 bg-green-900 text-white flex-shrink-0">
        {/* Логотип */}
        <div className="p-6 border-b border-green-800">
          <BillboardLogo />
        </div>
        
        {/* Навигационное меню */}
        <nav className="mt-8">
          <div className="px-4">
            <div className="flex items-center justify-between py-3 px-4 bg-green-800 rounded-lg mb-2">
              <div className="flex items-center space-x-3">
                <Menu className="w-5 h-5" />
                <span className="font-medium">Конструкции</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
            
            <div className="ml-4 space-y-1">
              <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                Список
              </div>
              <div className="py-2 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer flex items-center justify-between">
                <span>Добавить</span>
                <Plus className="w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                <div className="w-5 h-5 border rounded"></div>
                <span>Типы конструкций</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </div>
              
              <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                <div className="w-5 h-5 border rounded"></div>
                <span>Страницы</span>
              </div>
              
              <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
                <div className="w-5 h-5 border rounded"></div>
                <span>Общие блоки</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 px-4">
            <div className="flex items-center space-x-3 py-3 px-4 text-green-200 hover:text-white hover:bg-green-800 rounded cursor-pointer">
              <div className="w-5 h-5 border rounded"></div>
              <span>Настройки</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </nav>
      </aside>

      {/* Основное содержимое */}
      <div className="flex-1 flex flex-col">
        {/* Верхняя панель */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Хлебные крошки */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Application</span>
              <span>•</span>
              <span>Dashboard</span>
            </div>
            
            {/* Правая часть - поиск, уведомления, профиль */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Контент страницы */}
        <main className="flex-1 p-6">
          {/* Навигационные вкладки */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
              <button 
                onClick={() => setCurrentView('occupancy')}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md"
              >
                Клиенты
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                Список предложений
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                Конструкции
              </button>
              <button 
                onClick={() => setCurrentView('occupancy')}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md"
              >
                Сводная Таблица
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                Настройки
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                Админ
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md">
                Выйти
              </button>
            </div>
          </div>
          
          {/* Заголовок страницы */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Клиенты</h1>
            
            {/* Кнопка добавления */}
            <button 
              onClick={() => setCurrentView('add')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium mb-4"
            >
              Добавить нового клиента
            </button>
          </div>
          
          {/* Информация о результатах */}
          <div className="text-sm text-gray-600 mb-4">
            Отображается клиентов с 1 по {Math.min(10, clientsData.length)} из {clientsData.length} записей
          </div>

          {/* Таблица клиентов */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория клиента</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Менеджер</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Контактное лицо</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Контактные данные</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientsData.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          ✏️
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Описание */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-gray-700">Это общая таблица со списком всех клиентов.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;