// --- QUẢN LÝ DỮ LIỆU TRUNG TÂM ---
// Tất cả dữ liệu của ứng dụng sẽ được lưu trong đối tượng này.
const appData = {
    workItems: [],
    dataItems: [],
    financeItems: [],
    achievements: []
};

// --- CÁC HÀM XỬ LÝ CHUNG ---

/**
 * Hiển thị một mục (section) và ẩn các mục khác.
 * @param {string} sectionId - ID của section cần hiển thị.
 */
function showSection(sectionId) {
    // Ẩn tất cả các phần nội dung
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Bỏ trạng thái 'active' khỏi tất cả các nút điều hướng
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hiển thị section được chọn
    document.getElementById(sectionId).classList.add('active');
    
    // Thêm trạng thái 'active' cho nút được nhấn
    event.target.classList.add('active');
}

/**
 * Lưu toàn bộ dữ liệu ứng dụng vào localStorage.
 * Bọc trong try...catch để xử lý trường hợp trình duyệt chặn localStorage.
 */
function saveDataToStorage() {
    try {
        localStorage.setItem('personalManagerData', JSON.stringify(appData));
    } catch (e) {
        console.error("Lỗi khi lưu dữ liệu vào localStorage:", e);
        // Có thể hiển thị một thông báo cho người dùng ở đây nếu cần.
    }
}

/**
 * Tải toàn bộ dữ liệu từ localStorage khi ứng dụng khởi động.
 */
function loadDataFromStorage() {
    try {
        const savedData = JSON.parse(localStorage.getItem('personalManagerData'));
        if (savedData) {
            // Gán dữ liệu đã lưu vào đối tượng appData
            appData.workItems = savedData.workItems || [];
            appData.dataItems = savedData.dataItems || [];
            appData.financeItems = savedData.financeItems || [];
            appData.achievements = savedData.achievements || [];
        }
    } catch (e) {
        console.error("Lỗi khi tải dữ liệu từ localStorage:", e);
    }
}

// --- QUẢN LÝ CÔNG VIỆC (WORK) ---

function addWork() {
    const input = document.getElementById('workInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Vui lòng nhập công việc!');
        return;
    }
    
    appData.workItems.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    saveDataToStorage();
    renderWork();
    input.value = '';
    input.focus();
}

function toggleWork(id) {
    const work = appData.workItems.find(item => item.id === id);
    if (work) {
        work.completed = !work.completed;
        saveDataToStorage();
        renderWork();
    }
}

function deleteWork(id) {
    appData.workItems = appData.workItems.filter(item => item.id !== id);
    saveDataToStorage();
    renderWork();
}

function renderWork() {
    const list = document.getElementById('workList');
    list.innerHTML = '';
    
    appData.workItems.forEach(work => {
        const li = document.createElement('li');
        li.className = work.completed ? 'completed' : '';
        li.innerHTML = `
            <div class="item-content">${work.text}</div>
            <div class="item-actions">
                <button class="btn-small btn-complete" onclick="toggleWork(${work.id})">
                    ${work.completed ? '↩️ Hoàn tác' : '✓ Hoàn thành'}
                </button>
                <button class="btn-small btn-delete" onclick="deleteWork(${work.id})">🗑️ Xóa</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// --- QUẢN LÝ DỮ LIỆU (DATA) ---

function addData() {
    const titleInput = document.getElementById('dataTitle');
    const contentInput = document.getElementById('dataContent');
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (title === '' || content === '') {
        alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
        return;
    }
    
    appData.dataItems.push({
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('vi-VN')
    });
    
    saveDataToStorage();
    renderData();
    titleInput.value = '';
    contentInput.value = '';
}

function deleteData(id) {
    appData.dataItems = appData.dataItems.filter(item => item.id !== id);
    saveDataToStorage();
    renderData();
}

function renderData() {
    const list = document.getElementById('dataList');
    list.innerHTML = '';
    
    // Hiển thị dữ liệu mới nhất lên đầu
    [...appData.dataItems].reverse().forEach(data => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content.replace(/\n/g, '<br>')}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="date">📅 ${data.date}</span>
                <button class="btn-small btn-delete" onclick="deleteData(${data.id})">🗑️ Xóa</button>
            </div>
        `;
        list.appendChild(card);
    });
}

// --- QUẢN LÝ TÀI CHÍNH (FINANCE) ---

function addFinance() {
    const type = document.getElementById('financeType').value;
    const descInput = document.getElementById('financeDesc');
    const amountInput = document.getElementById('financeAmount');
    
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (desc === '' || isNaN(amount) || amount <= 0) {
        alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
        return;
    }
    
    appData.financeItems.push({
        id: Date.now(),
        type: type,
        description: desc,
        amount: amount,
        date: new Date().toLocaleDateString('vi-VN')
    });
    
    saveDataToStorage();
    renderFinance();
    
    descInput.value = '';
    amountInput.value = '';
}

function deleteFinance(id) {
    appData.financeItems = appData.financeItems.filter(item => item.id !== id);
    saveDataToStorage();
    renderFinance();
}

function renderFinance() {
    const list = document.getElementById('financeList');
    list.innerHTML = '';
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    appData.financeItems.forEach(finance => {
        if (finance.type === 'income') {
            totalIncome += finance.amount;
        } else {
            totalExpense += finance.amount;
        }
    });

    // Hiển thị giao dịch mới nhất lên đầu
    [...appData.financeItems].reverse().forEach(finance => {
        const li = document.createElement('li');
        li.className = `finance-item ${finance.type}`;
        li.innerHTML = `
            <div class="item-content">
                <strong>${finance.description}</strong><br>
                <small>📅 ${finance.date}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-weight: bold; color: ${finance.type === 'income' ? 'var(--mau-thanh-cong-start)' : 'var(--mau-xoa-start)'}">
                    ${finance.type === 'income' ? '+' : '-'} ${finance.amount.toLocaleString('vi-VN')} đ
                </span>
                <button class="btn-small btn-delete" onclick="deleteFinance(${finance.id})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
    
    // Cập nhật tổng kết
    const balance = totalIncome - totalExpense;
    document.getElementById('totalIncome').textContent = totalIncome.toLocaleString('vi-VN') + ' đ';
    document.getElementById('totalExpense').textContent = totalExpense.toLocaleString('vi-VN') + ' đ';
    document.getElementById('balance').textContent = balance.toLocaleString('vi-VN') + ' đ';

    // Cập nhật màu cho số dư
    const balanceEl = document.getElementById('balance');
    balanceEl.parentElement.className = 'summary-card'; // Reset
    if (balance > 0) {
        balanceEl.parentElement.classList.add('balance');
    } else {
        balanceEl.parentElement.classList.add('expense'); // Dùng màu đỏ nếu số dư âm
    }
}

// --- QUẢN LÝ THÀNH TÍCH (ACHIEVEMENT) ---

function addAchievement() {
    const titleInput = document.getElementById('achievementTitle');
    const dateInput = document.getElementById('achievementDate');
    const descInput = document.getElementById('achievementDesc');
    
    const title = titleInput.value.trim();
    const date = dateInput.value;
    const desc = descInput.value.trim();
    
    if (title === '' || date === '') {
        alert('Vui lòng nhập ít nhất tên thành tích và ngày!');
        return;
    }
    
    appData.achievements.push({
        id: Date.now(),
        title: title,
        date: new Date(date).toLocaleDateString('vi-VN'),
        description: desc
    });
    
    saveDataToStorage();
    renderAchievements();
    
    titleInput.value = '';
    dateInput.value = '';
    descInput.value = '';
}

function deleteAchievement(id) {
    appData.achievements = appData.achievements.filter(item => item.id !== id);
    saveDataToStorage();
    renderAchievements();
}

function renderAchievements() {
    const list = document.getElementById('achievementList');
    list.innerHTML = '';
    
    // Sắp xếp thành tích theo ngày mới nhất
    const sortedAchievements = [...appData.achievements].sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
    
    sortedAchievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <h3>🏆 ${achievement.title}</h3>
            ${achievement.description ? `<p>${achievement.description.replace(/\n/g, '<br>')}</p>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="date">📅 ${achievement.date}</span>
                <button class="btn-small btn-delete" onclick="deleteAchievement(${achievement.id})">🗑️ Xóa</button>
            </div>
        `;
        list.appendChild(card);
    });
}


// --- KHỞI TẠO ỨNG DỤNG ---
// Hàm này sẽ được chạy khi toàn bộ trang đã được tải xong.
document.addEventListener('DOMContentLoaded', function() {
    loadDataFromStorage(); // Tải dữ liệu từ localStorage
    
    // Hiển thị tất cả các danh sách với dữ liệu đã tải
    renderWork();
    renderData();
    renderFinance();
    renderAchievements();
});
