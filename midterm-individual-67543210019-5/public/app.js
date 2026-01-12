const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const totalSpan = document.getElementById('total');
const availableSpan = document.getElementById('available');
const borrowedSpan = document.getElementById('borrowed');
const addedMessage = document.getElementById('added-message'); // แสดงหนังสือที่เพิ่ม

// ดึงข้อมูลหนังสือจาก backend
async function fetchBooks() {
    try {
        const res = await fetch('/api/books');
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลหนังสือได้");

        const data = await res.json(); // data = { books: [...], statistics: {...} }
        renderBooks(data.books);
        updateStats(data.statistics);
    } catch (err) {
        console.error(err);
        addedMessage.textContent = "ไม่สามารถเชื่อมต่อ backend ❌";
    }
}

// แสดงรายการหนังสือ
function renderBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${book.title} โดย ${book.author} (ISBN: ${book.isbn})</span>
            <div>
                <button class="action-btn edit" onclick="toggleBorrowed(${book.id}, '${book.status}')">
                    ${book.status === 'borrowed' ? 'คืนหนังสือ' : 'ยืมหนังสือ'}
                </button>
                <button class="action-btn delete" onclick="deleteBook(${book.id})">ลบ</button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

// อัปเดตสถิติ
function updateStats(stats) {
    totalSpan.textContent = stats.total;
    availableSpan.textContent = stats.available;
    borrowedSpan.textContent = stats.borrowed;
}

// เพิ่มหนังสือใหม่
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
    };

    try {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        if (res.ok) {
            const addedBook = await res.json();
            addedMessage.textContent = `เพิ่มหนังสือ: "${addedBook.title}" / ผู้แต่ง: ${addedBook.author} / ISBN: ${addedBook.isbn} ✅`;
            addBookForm.reset();
            fetchBooks();
        } else {
            const error = await res.json();
            addedMessage.textContent = "เกิดข้อผิดพลาดในการเพิ่มหนังสือ ❌";
        }
    } catch (err) {
        console.error(err);
        addedMessage.textContent = "ไม่สามารถเชื่อมต่อ backend ❌";
    }
});

// ลบหนังสือ
async function deleteBook(id) {
    try {
        const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("ลบหนังสือไม่สำเร็จ");
        addedMessage.textContent = "ลบหนังสือเรียบร้อย ✅";
        fetchBooks();
    } catch (err) {
        console.error(err);
        addedMessage.textContent = "เกิดข้อผิดพลาดในการลบหนังสือ ❌";
    }
}

// ยืม/คืนหนังสือ
async function toggleBorrowed(id, status) {
    try {
        const newStatus = status === 'available' ? 'borrowed' : 'available';
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (!res.ok) throw new Error("ไม่สามารถเปลี่ยนสถานะหนังสือได้");
        addedMessage.textContent = newStatus === 'borrowed' ? "ยืมหนังสือเรียบร้อย ✅" : "คืนหนังสือเรียบร้อย ✅";
        fetchBooks();
    } catch (err) {
        console.error(err);
        addedMessage.textContent = "เกิดข้อผิดพลาดในการเปลี่ยนสถานะหนังสือ ❌";
    }
}

// โหลดข้อมูลครั้งแรก
fetchBooks();
