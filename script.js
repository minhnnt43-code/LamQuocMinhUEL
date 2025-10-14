// Khởi tạo dữ liệu từ localStorage
let workItems = JSON.parse(localStorage.getItem('workItems')) || [];
let dataItems = JSON.parse(localStorage.getItem('dataItems')) || [];
let financeItems = JSON.parse(localStorage.getItem('financeItems')) || [];
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

// Hàm chuyển đổi giữa các phần
function showSection(sectionId) {
    // Ẩn tất cả các phần
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Bỏ active khỏi tất cả nút
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hiển thị phần được chọn
    document.getElementById(sectionId).classList.add('active');
    
    // Thêm active cho nút được chọn
    event.target.classList.add('active');
}

// ========== QUẢN LÝ CÔNG VIỆC ==========
function addWork() {
    const input = document.getElementById('workInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Vui lòng nhập công việc!');
        return;
    }
    
    const work = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    workItems.push(work);
    saveWork();
    renderWork();
    input.value = '';
}

function toggleWork(id) {
    const work = workItems.find(item => item.id === id);
    if (work) {
        work.completed = !work.completed;
        saveWork();
        renderWork();
    }
}

function deleteWork(id) {
    workItems = workItems.filter(item => item.id !== id);
    saveWork();
    renderWork();
}

function saveWork() {
    localStorage.setItem('workItems', JSON.stringify(workItems));
}

function renderWork() {
    const list = document.getElementById('workList');
    list.innerHTML = '';
    
    workItems.forEach(work => {
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

// ========== QUẢN LÝ DỮ LIỆU ==========
function addData() {
    const titleInput = document.getElementById('dataTitle');
    const contentInput = document.getElementById('dataContent');
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (title === '' || content === '') {
        alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
        return;
    }
    
    const data = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('vi-VN')
    };
    
    dataItems.push(data);
    saveData();
    renderData();
    titleInput.value = '';
    contentInput.value = '';
}

function deleteData(id) {
    dataItems = dataItems.filter(item => item.id !== id);
    saveData();
    renderData();
}

function saveData() {
    localStorage.setItem('dataItems', JSON.stringify(dataItems));
}

function renderData() {
    const list = document.getElementById('dataList');
    list.innerHTML = '';
    
    dataItems.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="date">📅 ${data.date}</span>
                <button class="btn-small btn-delete" onclick="deleteData(${data.id})">🗑️ Xóa</button>
            </div>
        `;
        list.appendChild(card);
    });
}

// ========== QUẢN LÝ TÀI CHÍNH ==========
function addFinance() {
    const type = document.getElementById('financeType').value;
    const desc = document.getElementById('financeDesc').value.trim();
    const amount = parseFloat(document.getElementById('financeAmount').value);
    
    if (desc === '' || isNaN(amount) || amount <= 0) {
        alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
        return;
    }
    
    const finance = {
        id: Date.now(),
        type: type,
        description: desc,
        amount: amount,
        date: new Date().toLocaleDateString('vi-VN')
    };
    
    financeItems.push(finance);
    saveFinance();
    renderFinance();
    
    document.getElementById('financeDesc').value = '';
    document.getElementById('financeAmount').value = '';
}

function deleteFinance(id) {
    financeItems = financeItems.filter(item => item.id !== id);
    saveFinance();
    renderFinance();
}

function saveFinance() {
    localStorage.setItem('financeItems', JSON.stringify(financeItems));
}

function renderFinance() {
    const list = document.getElementById('financeList');
    list.innerHTML = '';
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    financeItems.forEach(finance => {
        if (finance.type === 'income') {
            totalIncome += finance.amount;
        } else {
            totalExpense += finance.amount;
        }
        
        const li = document.createElement('li');
        li.className = `finance-item ${finance.type}`;
        li.innerHTML = `
            <div class="item-content">
                <strong>${finance.description}</strong><br>
                <small>📅 ${finance.date}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-weight: bold; color: ${finance.type === 'income' ? '#28a745' : '#dc3545'}">
                    ${finance.type === 'income' ? '+' : '-'} ${finance.amount.toLocaleString('vi-VN')} đ
                </span>
                <button class="btn-small btn-delete" onclick="deleteFinance(${finance.id})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
    
    // Cập nhật tổng kết
    document.getElementById('totalIncome').textContent = totalIncome.toLocaleString('vi-VN') + ' đ';
    document.getElementById('totalExpense').textContent = totalExpense.toLocaleString('vi-VN') + ' đ';
    document.getElementById('balance').textContent = (totalIncome - totalExpense).toLocaleString('vi-VN') + ' đ';
}

// ========== QUẢN LÝ THÀNH TÍCH ==========
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
    
    const achievement = {
        id: Date.now(),
        title: title,
        date: new Date(date).toLocaleDateString('vi-VN'),
        description: desc
    };
    
    achievements.push(achievement);
    saveAchievements();
    renderAchievements();
    
    titleInput.value = '';
    dateInput.value = '';
    descInput.value = '';
}

function deleteAchievement(id) {
    achievements = achievements.filter(item => item.id !== id);
    saveAchievements();
    renderAchievements();
}

function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function renderAchievements() {
    const list = document.getElementById('achievementList');
    list.innerHTML = '';
    
    achievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <h3>🏆 ${achievement.title}</h3>
            ${achievement.description ? `<p>${achievement.description}</p>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="date">📅 ${achievement.date}</span>
                <button class="btn-small btn-delete" onclick="deleteAchievement(${achievement.id})">🗑️ Xóa</button>
            </div>
        `;
        list.appendChild(card);
    });
}

// Khởi tạo trang khi load
document.addEventListener('DOMContentLoaded', function() {
    renderWork();
    renderData();
    renderFinance();
    renderAchievements();
});

