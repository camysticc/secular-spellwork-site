import './App.css';
import React, { useState, useEffect } from 'react';
import { Moon, Star, Sparkles, Sun, Circle, Menu, X, Search, Filter, Save, Plus, Trash2, Edit, CreditCard } from 'lucide-react';

// --- Components ---

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <Star className="loading-star" size={48} />
      </div>
    </div>
  );
};

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'spellwork', label: 'Spell Work' },
    { id: 'tarot', label: 'Tarot' },
    { id: 'guides', label: 'Guides' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'admin', label: 'ADMIN', special: true }
  ];
  
  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };
  
  return (
    <>
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => setCurrentPage('home')}>SS</div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="nav-links desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${currentPage === item.id ? 'active' : ''} ${item.special ? 'admin-link' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''} ${item.special ? 'mobile-admin-link' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <span className="link-number">0{index + 1}</span>
              {item.label}
            </button>
          ))}
          <div className="menu-footer">
            <Star className="gold-icon" size={20} />
            <span>Secular Spellwork</span>
            <Star className="gold-icon" size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

const Starfield = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 2}s`
  }));
  
  return (
    <div className="starfield">
      {stars.map(star => (
        <div key={star.id} className="star" style={{left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration}} />
      ))}
    </div>
  );
};

const HomePage = ({ setCurrentPage }) => {
  const moonPhases = [
    { icon: Circle, label: 'New' },
    { icon: Moon, label: 'Waxing' },
    { icon: Sun, label: 'Full' },
    { icon: Moon, label: 'Waning' },
    { icon: Circle, label: 'Dark' }
  ];
  
  const services = [
    { id: 'spellwork', title: 'Spell Work', desc: 'Custom rituals & enchantments' },
    { id: 'tarot', title: 'Tarot', desc: 'Divination & guidance' },
    { id: 'guides', title: 'Guides', desc: 'Sacred knowledge' },
    { id: 'qualifications', title: 'Qualifications', desc: 'My journey' }
  ];
  
  return (
    <div className="page home-page">
      <div className="hero-section">
        <div className="moon-phases">
          {moonPhases.map((phase, i) => {
            const Icon = phase.icon;
            return <div key={i} className="moon-phase"><Icon size={32} /></div>;
          })}
        </div>
        <h1 className="hero-title">SECULAR SPELLWORK</h1>
        <div className="hero-divider"></div>
        <p className="hero-subtitle">Ancient wisdom for modern souls</p>
      </div>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card" onClick={() => setCurrentPage(service.id)}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpellWorkPage = ({ setCurrentPage, setSelectedItem }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['ALL', 'GENERAL', 'LOVE/SEX', 'MONEY', 'BANEFUL'];

  const spells = [
    { id: 1, name: 'Aura Cleansing Spell', price: 20, category: 'GENERAL', url: 'https://buy.stripe.com/28E9AV9hd9xR8Nn3znb7y0a', desc: 'A deep energetic reset for your personal aura.' },
    { id: 2, name: 'Protection Spell', price: 20, category: 'GENERAL', url: 'https://buy.stripe.com/eVq7sN3WT39t5Bbgm9b7y09', desc: 'Shield yourself from negative influences.' },
    { id: 3, name: 'Come To Me Spell', price: 30, category: 'LOVE/SEX', url: 'https://buy.stripe.com/8x228tbpl11ld3Dee1b7y08', desc: 'Attract a specific energy or person towards you.' },
    { id: 4, name: 'Soul Binding', price: 35, category: 'LOVE/SEX', url: 'https://buy.stripe.com/8x214pbplbFZ2oZ3znb7y07', desc: 'A powerful connection ritual for two souls.' },
    { id: 5, name: 'Self Glamour/Beautification Spell', price: 30, category: 'LOVE/SEX', url: 'https://buy.stripe.com/eVq00lctp5hB5Bbb1Pb7y06', desc: 'Enhance your natural magnetism and allure.' },
    { id: 6, name: 'Romance Road Opener', price: 30, category: 'LOVE/SEX', url: 'https://buy.stripe.com/bJe6oJbpl25p4x7ee1b7y05', desc: 'Clear the path for new romantic opportunities.' },
    { id: 7, name: 'Money Drawing Spell', price: 30, category: 'MONEY', url: 'https://buy.stripe.com/cNicN750XeSb4x74Drb7y04', desc: 'Invite financial abundance and prosperity.' },
    { id: 8, name: 'Financial Road Opener', price: 35, category: 'MONEY', url: 'https://buy.stripe.com/9B628t8d9dO7fbL2vjb7y03', desc: 'Remove obstacles blocking your wealth flow.' },
    { id: 9, name: 'Put They Ahh In A Jar', price: 50, category: 'BANEFUL', url: 'https://buy.stripe.com/5kQ8wR9hddO76Ff7PDb7y02', desc: 'Traditional containment and binding work.' },
    { id: 10, name: 'Disconnect From All', price: 65, category: 'BANEFUL', url: 'https://buy.stripe.com/8x28wRdxt11lgfP5Hvb7y01', desc: 'Sever all energetic ties completely.' },
    { id: 11, name: 'Road Blocker', price: 30, category: 'BANEFUL', url: 'https://buy.stripe.com/3cIeVfeBx11l8Nn1rfb7y00', desc: 'Hinder progress and movement of a target.' }
  ];

  const filteredSpells = spells.filter(spell => {
    const matchesCategory = activeCategory === 'ALL' || spell.category === activeCategory;
    const matchesSearch = spell.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (spell) => {
    setSelectedItem({ ...spell, type: 'Spell' });
    setCurrentPage('contact');
  };

  return (
    <div className="page spellwork-page">
      <h1 className="page-title">Spell Work</h1>
      <div className="gold-divider"></div>
      
      {/* --- PRETTY SEARCH & FILTER BAR --- */}
      <div className="spell-management-header">
        <div className="spell-search-container">
          <Search size={20} className="gold-icon search-icon" />
          <input 
            type="text" 
            placeholder="Search spells..." 
            className="pretty-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter-bar">
          <Filter size={18} className="gold-icon filter-icon" />
          <div className="pretty-filter-group">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`pretty-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="spells-grid">
        {filteredSpells.length > 0 ? (
          filteredSpells.map(spell => (
            <div key={spell.id} className="spell-card">
              <div className="spell-category-tag">{spell.category}</div>
              <h3>{spell.name}</h3>
              <div className="spell-price">£{spell.price}</div>
              <div className="product-actions">
                <button className="btn-view" onClick={() => handleSelect(spell)}>View Details</button>
                <a href={spell.url} target="_blank" rel="noopener noreferrer" className="btn-purchase">
                  <CreditCard size={16} /> Purchase
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="placeholder-text">No spells match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

const TarotPage = ({ setCurrentPage, setSelectedItem }) => {
  const sections = [
    {
      title: 'General Readings',
      items: [
        { id: 't1', name: 'Yes/No Question', price: 1.50, url: 'https://buy.stripe.com/7sY28t9hd25p2oZ7PDb7y0i', desc: 'A direct answer to a single focused question.' },
        { id: 't2', name: 'One Card Pull', price: 1.50, url: 'https://buy.stripe.com/bJe6oJeBxaBV1kV1rfb7y0h', desc: 'Quick guidance for your current energy.' },
        { id: 't3', name: 'The 4 Seasons', price: 6.00, url: 'https://buy.stripe.com/28EdRb9hd11l7Jj6Lzb7y0b', desc: 'An outlook on the four major cycles ahead.' },
        { id: 't4', name: 'Decision Maker', price: 2.50, url: 'https://buy.stripe.com/5kQbJ3651eSb3t3ee1b7y0c', desc: 'Clarity on choosing between two paths.' },
        { id: 't5', name: 'PPF Reading', price: 3.50, url: 'https://buy.stripe.com/4gM3cx9hdfWf5Bb4Drb7y0g', desc: 'Past, Present, and Future spread.' }
      ]
    },
    {
      title: 'In-Depth Readings',
      items: [
        { id: 't6', name: 'The Year Ahead (Each Month)', price: 12.50, url: 'https://buy.stripe.com/fZu5kF2SPh0j0gRc5Tb7y0d', desc: 'Comprehensive month-by-month forecast.' },
        { id: 't7', name: 'Celtic Cross', price: 15.00, url: 'https://buy.stripe.com/dRm3cxfFB11l2oZ2vjb7y0e', desc: 'Traditional 10-card deep dive into your situation.' }
      ]
    }
  ];

  const handleSelect = (item) => {
    setSelectedItem({ ...item, type: 'Tarot' });
    setCurrentPage('contact');
  };

  return (
    <div className="page tarot-page">
      <h1 className="page-title">Tarot Readings</h1>
      <div className="gold-divider"></div>
      
      {sections.map(section => (
        <div key={section.title} className="tarot-content-section">
          <h2 className="section-subtitle">{section.title}</h2>
          <div className="tarot-grid">
            {section.items.map(item => (
              <div key={item.id} className="tarot-card">
                <h3>{item.name}</h3>
                <div className="tarot-price">£{item.price.toFixed(2)}</div>
                <div className="product-actions">
                  <button className="btn-view" onClick={() => handleSelect(item)}>View Details</button>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-purchase">
                    <CreditCard size={16} /> Purchase
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminPanel = ({ guides, setGuides }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('guides');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for the new popup form
  const [editForm, setEditForm] = useState({ 
    id: null, 
    title: '', 
    desc: '', 
    url: '', 
    price: '', 
    type: 'paid' // dropdown state: 'free' or 'paid'
  });

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;
    if (password === 'ss-admin-26') {
      setAuthenticated(true);
      setLoginAttempts(0);
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      if (attempts >= 3) {
        setIsLocked(true);
        setTimeout(() => { setIsLocked(false); setLoginAttempts(0); }, 30000);
      }
      alert(`Access Denied. ${3 - attempts} attempts remain.`);
    }
    setPassword('');
  };

  const saveGuide = () => {
    // Basic validation: Title and URL are always required
    if (!editForm.title || !editForm.url) {
      alert("Please fill in the Title and URL.");
      return;
    }

    const submission = {
      ...editForm,
      id: editForm.id || Date.now(),
      isFree: editForm.type === 'free',
      price: editForm.type === 'free' ? 0 : editForm.price
    };

    if (editForm.id) {
      setGuides(guides.map(g => g.id === editForm.id ? submission : g));
    } else {
      setGuides([...guides, submission]);
    }
    
    setIsEditing(false);
  };

  if (!authenticated) {
    /* ... Keep existing login JSX ... */
  }

  return (
    <div className="page admin-page">
      <div className="admin-header-flex">
        <h1 className="page-title">Management</h1>
        <button className="logout-btn" onClick={() => setAuthenticated(false)}>Lock Sanctum</button>
      </div>
      <div className="gold-divider"></div>

      <div className="admin-tabs">
        {['guides', 'spells', 'tarot'].map(tab => (
          <button key={tab} className={`admin-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>

      {activeTab === 'guides' && (
        <div className="admin-grid-container">
          <button className="admin-add-btn" onClick={() => {
            setEditForm({ id: null, title: '', desc: '', url: '', price: '', type: 'paid' });
            setIsEditing(true);
          }}>
            <Plus size={18} /> ADD NEW GUIDE
          </button>

          {/* --- POPUP MODAL --- */}
          {isEditing && (
            <div className="admin-modal-overlay">
              <div className="admin-modal-content">
                <h2 className="section-subtitle">{editForm.id ? 'Edit Guide' : 'Add New Guide'}</h2>
                
                <input 
                  placeholder="Title" 
                  value={editForm.title} 
                  onChange={e => setEditForm({...editForm, title: e.target.value})} 
                />
                
                <textarea 
                  placeholder="Description" 
                  value={editForm.desc} 
                  onChange={e => setEditForm({...editForm, desc: e.target.value})} 
                />

                <div className="form-group">
                  <label>Offering Type</label>
                  <select 
                    value={editForm.type} 
                    onChange={e => setEditForm({...editForm, type: e.target.value})}
                    className="admin-select"
                  >
                    <option value="paid">Paid Offering</option>
                    <option value="free">Free Download</option>
                  </select>
                </div>

                {editForm.type === 'paid' ? (
                  <>
                    <input 
                      type="number" 
                      placeholder="Price (£)" 
                      value={editForm.price} 
                      onChange={e => setEditForm({...editForm, price: e.target.value})} 
                    />
                    <input 
                      placeholder="Stripe Payment URL" 
                      value={editForm.url} 
                      onChange={e => setEditForm({...editForm, url: e.target.value})} 
                    />
                  </>
                ) : (
                  <input 
                    placeholder="Direct Download URL" 
                    value={editForm.url} 
                    onChange={e => setEditForm({...editForm, url: e.target.value})} 
                  />
                )}

                <div className="modal-btns">
                  <button onClick={saveGuide} className="submit-btn">SAVE</button>
                  <button onClick={() => setIsEditing(false)} className="logout-btn">CANCEL</button>
                </div>
              </div>
            </div>
          )}

          <div className="admin-management-list">
            {guides.map(guide => (
              <div key={guide.id} className="admin-data-card">
                <div className="card-info">
                  <h4>{guide.title}</h4>
                  <span>{guide.isFree ? 'FREE' : `£${guide.price}`}</span>
                </div>
                <div className="card-actions">
                  <button className="icon-btn edit" onClick={() => { 
                    setEditForm({ ...guide, type: guide.isFree ? 'free' : 'paid' }); 
                    setIsEditing(true); 
                  }}><Edit size={16} /></button>
                  <button className="icon-btn delete" onClick={() => setGuides(guides.filter(g => g.id !== guide.id))}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GuidesPage = ({ guides }) => (
    <div className="page guides-page">
      <h1 className="page-title">Sacred Guides</h1>
      <div className="gold-divider"></div>
      <div className="guides-grid">
        {guides.map(guide => (
          <div key={guide.id} className="guide-card">
            <h3>{guide.title}</h3>
            <p>{guide.desc}</p>
            <div className="guide-price">{guide.isFree ? 'FREE' : `£${guide.price}`}</div>
            <a href={guide.url} target="_blank" rel="noreferrer" className="btn-purchase" style={{display:'flex', textDecoration:'none', marginTop:'1rem', justifyContent:'center'}}>
                {guide.isFree ? 'Download' : <><CreditCard size={16} /> Purchase</>}
            </a>
          </div>
        ))}
      </div>
    </div>
);

const QualificationsPage = () => (
    <div className="page qualifications-page">
      <h1 className="page-title">My Journey</h1>
      <div className="gold-divider"></div>
      <div className="timeline">
          <p className="quals-intro">Certified practitioner of secular folk magic and tarot with over 5 years of professional experience.</p>
          <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content"><div className="timeline-dot"></div><p>Serving 500+ clients worldwide.</p></div>
          </div>
      </div>
    </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [guides, setGuides] = useState([
    { id: 1, title: "Beginner's Guide to Candle Magic", price: 5, desc: 'Learn the foundations of candle spellwork', url: '#', isFree: false }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'spellwork': return <SpellWorkPage setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'tarot': return <TarotPage setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'guides': return <GuidesPage guides={guides} />;
      case 'qualifications': return <QualificationsPage />;
      case 'contact': return <ContactPage selectedItem={selectedItem} setCurrentPage={setCurrentPage} />;
      case 'admin': return <AdminPanel guides={guides} setGuides={setGuides} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <div className="app">
      <LoadingScreen isLoading={loading} />
      <Starfield />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
};

export default App;

const ContactPage = ({ selectedItem, setCurrentPage }) => {
  return (
    <div className="p-8 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Contact & Booking</h1>
      <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
        <p className="mb-4">
          {selectedItem ? (
            <span>You are inquiring about: <strong>{selectedItem.title}</strong></span>
          ) : (
            "Interested in a spell or tarot reading?"
          )}
        </p>
        <p className="text-gray-300 mb-6">Please email me at: <strong>your-email@example.com</strong></p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};