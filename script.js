// Global variables
let expenses = [];
let currentTab = 'expense';

// DOM elements
const expenseTab = document.getElementById('expense-tab');
const statisticsTab = document.getElementById('statistics-tab');
const expenseSection = document.getElementById('expense-section');
const statisticsSection = document.getElementById('statistics-section');
const dateTimeInput = document.getElementById('date-time');
const categorySelect = document.getElementById('category');
const itemInput = document.getElementById('item');
const expenseInput = document.getElementById('expense');
const descriptionTextarea = document.getElementById('description');
const recordButton = document.getElementById('record-button');
const nowButton = document.getElementById('now-button');
const statisticsRows = document.getElementById('statistics-rows');
const totalAmount = document.getElementById('total-amount');
const pieChart = document.getElementById('pie-chart');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateStatistics();
});

// Event listeners
function initializeEventListeners() {
    // Tab switching
    expenseTab.addEventListener('click', () => switchTab('expense'));
    statisticsTab.addEventListener('click', () => switchTab('statistics'));
    
    // Form interactions
    nowButton.addEventListener('click', setCurrentDateTime);
    recordButton.addEventListener('click', recordExpense);
    
    // Input validation
    [dateTimeInput, categorySelect, itemInput, expenseInput].forEach(input => {
        input.addEventListener('input', clearError);
    });
}

// Tab switching functionality
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab appearance
    if (tab === 'expense') {
        expenseTab.classList.add('active');
        statisticsTab.classList.remove('active');
        expenseSection.classList.remove('hidden');
        statisticsSection.classList.add('hidden');
    } else {
        statisticsTab.classList.add('active');
        expenseTab.classList.remove('active');
        expenseSection.classList.add('hidden');
        statisticsSection.classList.remove('hidden');
        updateStatistics();
    }
}

// Set current date and time
function setCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    // Convert to 12-hour format
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'pm' : 'am';
    
    const dateTimeString = `${year}-${month}-${day} : ${hour12}${minute !== '00' ? ':' + minute : ''}${ampm}`;
    dateTimeInput.value = dateTimeString;
    clearError();
}

// Clear error styling
function clearError() {
    this.classList.remove('error');
}

// Record expense function
function recordExpense() {
    // Clear previous errors
    [dateTimeInput, categorySelect, itemInput, expenseInput].forEach(input => {
        input.classList.remove('error');
    });
    
    // Validate required fields
    const dateTime = dateTimeInput.value.trim();
    const category = categorySelect.value;
    const item = itemInput.value.trim();
    const expense = expenseInput.value.trim();
    const description = descriptionTextarea.value.trim();
    
    // Check for empty required fields
    if (!dateTime) {
        dateTimeInput.classList.add('error');
        dateTimeInput.focus();
        return;
    }
    
    if (!category) {
        categorySelect.classList.add('error');
        categorySelect.focus();
        return;
    }
    
    if (!item) {
        itemInput.classList.add('error');
        itemInput.focus();
        return;
    }
    
    if (!expense || parseFloat(expense) <= 0) {
        expenseInput.classList.add('error');
        expenseInput.focus();
        return;
    }
    
    // Validate date format
    if (!isValidDateTimeFormat(dateTime)) {
        dateTimeInput.classList.add('error');
        dateTimeInput.focus();
        alert('請輸入正確的日期格式：YYYY-MM-DD : hh[am/pm]');
        return;
    }
    
    // Create expense object
    const expenseRecord = {
        id: Date.now(),
        dateTime: dateTime,
        category: category,
        item: item,
        expense: Math.round(parseFloat(expense)),
        description: description,
        timestamp: new Date().toISOString()
    };
    
    // Add to expenses array
    expenses.push(expenseRecord);
    
    // Clear form
    clearForm();
    
    // Show success message
    showSuccessMessage('支出記錄已成功添加！');
    
    // Update statistics if on statistics tab
    if (currentTab === 'statistics') {
        updateStatistics();
    }
}

// Validate date time format
function isValidDateTimeFormat(dateTime) {
    const regex = /^\d{4}-\d{2}-\d{2}\s*:\s*\d{1,2}(?::\d{2})?[ap]m$/i;
    return regex.test(dateTime);
}

// Clear form
function clearForm() {
    dateTimeInput.value = '';
    categorySelect.value = '';
    itemInput.value = '';
    expenseInput.value = '';
    descriptionTextarea.value = '';
}

// Show success message
function showSuccessMessage(message) {
    const button = recordButton;
    const originalText = button.textContent;
    const originalBg = button.style.background;
    
    button.textContent = message;
    button.style.background = '#28a745';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg;
        button.disabled = false;
    }, 2000);
}

// Update statistics
function updateStatistics() {
    if (expenses.length === 0) {
        showEmptyStatistics();
        return;
    }
    
    // Calculate category totals
    const categoryTotals = {};
    let grandTotal = 0;
    
    expenses.forEach(expense => {
        const category = expense.category;
        const amount = expense.expense;
        
        if (categoryTotals[category]) {
            categoryTotals[category] += amount;
        } else {
            categoryTotals[category] = amount;
        }
        
        grandTotal += amount;
    });
    
    // Update statistics table
    updateStatisticsTable(categoryTotals, grandTotal);
    
    // Update pie chart
    updatePieChart(categoryTotals);
}

// Show empty statistics
function showEmptyStatistics() {
    statisticsRows.innerHTML = '<div class="statistics-row"><div class="statistics-cell" style="text-align: center; color: #6c757d; font-style: italic;">尚無支出記錄</div><div class="statistics-cell"></div></div>';
    totalAmount.textContent = '$0';
    
    // Clear pie chart
    const ctx = pieChart.getContext('2d');
    ctx.clearRect(0, 0, pieChart.width, pieChart.height);
}

// Update statistics table
function updateStatisticsTable(categoryTotals, grandTotal) {
    const categories = ['Food', 'Entertain', 'Travel', 'Utility'];
    let html = '';
    
    categories.forEach(category => {
        const amount = categoryTotals[category] || 0;
        if (amount > 0) {
            html += `
                <div class="statistics-row">
                    <div class="statistics-cell">${category}</div>
                    <div class="statistics-cell">$${amount.toLocaleString()}</div>
                </div>
            `;
        }
    });
    
    statisticsRows.innerHTML = html;
    totalAmount.textContent = `$${grandTotal.toLocaleString()}`;
}

// Update pie chart
function updatePieChart(categoryTotals) {
    const ctx = pieChart.getContext('2d');
    const centerX = pieChart.width / 2;
    const centerY = pieChart.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, pieChart.width, pieChart.height);
    
    // Calculate total
    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    
    if (total === 0) return;
    
    // Color palette
    const colors = {
        'Food': '#ff6b6b',
        'Entertain': '#4ecdc4',
        'Travel': '#45b7d1',
        'Utility': '#96ceb4'
    };
    
    // Draw pie slices
    let currentAngle = -Math.PI / 2; // Start from top
    
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > 0) {
            const sliceAngle = (amount / total) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[category] || '#cccccc';
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            currentAngle += sliceAngle;
        }
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add total text in center
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Total', centerX, centerY - 8);
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`$${total.toLocaleString()}`, centerX, centerY + 12);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
