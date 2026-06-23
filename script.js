// ==================== 1. SECURITY & DOMAIN LOCK ====================
(function() {
    const _0xValidHost = "anshkumargupta24052010-ship-it.github.io";
    const _0xFinalHost = ""; 
    const currentHost = window.location.hostname;

    if (currentHost !== _0xValidHost && currentHost !== _0xFinalHost && currentHost !== "localhost" && currentHost !== "127.0.0.1") {
        triggerTrap("UNAUTHORIZED_DOMAIN_THEFT");
    }

    function triggerTrap(reason) {
        console.clear();
        for(let i=0; i<100; i++) { console.error("🚨 BAAP BAAP HOTA HAI! 🚨 STOP STEALING MY CODE."); }
        document.documentElement.innerHTML = `
            <div style="background:#000; color:#ff3333; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:monospace; text-align:center; padding:20px;">
                <h1 style="font-size:3rem; margin-bottom:10px;">⚠️ CORE CORRUPTION ERROR [${reason}]</h1>
                <p style="color:#888; font-size:1.2rem;">Kernel execution halted. Security handshake failed.</p>
                <p style="color:#555; margin-top:30px; font-size:0.8rem;">Developed by Ansh Kumar Gupta. Access Denied.</p>
            </div>
        `;
        while(true) { debugger; }
    }
})();

// Shortcuts & Right Click Block
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; 
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false; 
};
// ==========================================
// OBSIDIAN LOUNGE - PREMIUM ROUTER ENGINE
// ==========================================

const SUPABASE_URL = "https://ffcpkskspsihqyzjereh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UoBOQcxyZQE0lfbNs3eHkA_aZNVFgKz";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ⚠️ WHATSAPP NUMBER: Apne Lounge ka number yahan daal do bina '+' sign ke.
const MY_WHATSAPP_NUMBER = "916266419845"; 

let currentEditingItemId = null;
let selectedItemForOrder = null; 

// ================= PREMIUM HORIZONTAL PREVIEW ROUTING =================
function openOrderModal(name, rate, imgUrl, desc, category) {
    selectedItemForOrder = { name, rate };
    
    // Elements Populating with Clean Data
    document.getElementById('preview-item-name').innerText = name.toUpperCase();
    document.getElementById('preview-item-price').innerText = `INR ${rate}`;
    document.getElementById('preview-item-img').src = imgUrl;
    document.getElementById('preview-item-desc').innerText = desc ? desc : "No description available for this luxury product.";
    document.getElementById('preview-item-tag').innerText = category ? category.toUpperCase() : "LOUNGE SPECIAL";

    const modal = document.getElementById('order-modal');
    if(modal) modal.style.display = 'flex';
}

function closeOrderModal() {
    selectedItemForOrder = null;
    const modal = document.getElementById('order-modal');
    if(modal) modal.style.display = 'none';
}

function processWhatsAppOrder() {
    if (!selectedItemForOrder) return;

    // Sirf ek input data - Table No.
    const tableNo = prompt("Please enter your Table Number to confirm order:");
    if (!tableNo) {
        alert("Table number is absolutely required to place your order!");
        return;
    }

    // Dynamic clean design text layout for kitchen dispatch
    const message = `🔥 *NEW ORDER - OBSIDIAN LOUNGE* 🔥%0A%0A📍 *Table No:* ${tableNo}%0A🍹 *Item:* ${selectedItemForOrder.name}%0A💰 *Price:* INR ${selectedItemForOrder.rate}%0A%0APlease prepare my order! Thank you.`;

    closeOrderModal();
    window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

// ================= TABLE BOOKING ENGINE =================
function initWhatsAppBooking() {
    const bookBtn = document.getElementById('whatsapp-book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = prompt("Enter your Name for reservation:");
            if (!name) return;

            const date = prompt("Enter Date (e.g., Today, Tomorrow):");
            if (!date) return;

            const time = prompt("Enter Arrival Time (e.g., 08:00 PM):");
            if (!time) return;

            const guests = prompt("Number of Guests / People:");
            if (!guests) return;

            const message = `Hello Obsidian Lounge! 🌟%0A%0AI want to book a table/lounge. Here are my details:%0A%0A👤 *Name:* ${name}%0A📅 *Date:* ${date}%0A🕒 *Time:* ${time}%0A👥 *Guests:* ${guests}%0A%0APlease confirm my booking. Thanks!`;

            window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    }
}

// ================= ADMIN SECRET TRIPLE CLICK SYSTEM =================
let clickCount = 0;
let clickTimeout;

function initSecretTrigger() {
    const triggerElement = document.getElementById('secret-trigger');
    if (triggerElement) {
        triggerElement.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => { clickCount = 0; }, 800);

            if (clickCount === 3) {
                clickCount = 0; 
                toggleAdminModal();
            }
        });
    }
}

function toggleAdminModal() {
    const modal = document.getElementById('admin-modal');
    if(modal) {
        modal.classList.toggle('hidden');
        if(!modal.classList.contains('hidden')) { generateMenuQR(); }
    }
}

function checkAdminLogin() {
    const pass = document.getElementById('admin-pass').value;
    if(pass === "sargawa786") { 
        document.getElementById('admin-login-section').classList.add('hidden');
        document.getElementById('admin-dashboard-section').classList.remove('hidden');
    } else {
        alert("ACCESS DENIED: WRONG PASSWORD");
    }
}

// ================= DYNAMIC DATA COMPILER =================
async function fetchMenu() {
    const { data: menuItems, error } = await supabaseClient
        .from('menu_items')
        .select('*')
        .order('id', { ascending: false }); 

    if (error) {
        console.error("Error fetching menu:", error);
        return;
    }

    const container = document.getElementById('bar-container'); 
    const adminContainer = document.getElementById('admin-items-list'); 

    if (container) container.innerHTML = '';
    if (adminContainer) adminContainer.innerHTML = '';

    menuItems.forEach(item => {
        if (container) {
            // Processing parameters inside safe single quotes
            const nameParam = item.name.replace(/'/g, "\\'");
            const descParam = item.description ? item.description.replace(/'/g, "\\'") : '';
            const subCatParam = item.sub_category ? item.sub_category.replace(/'/g, "\\'") : '';

            container.innerHTML += `
                <div class="menu-card" onclick="openOrderModal('${nameParam}', ${item.rate}, '${item.image_url}', '${descParam}', '${subCatParam}')">
                    <img src="${item.image_url}" alt="${item.name}" class="item-img" />
                    <div class="item-details">
                        <h3>
                            ${item.name} 
                            <span class="tag">${item.sub_category || ''}</span>
                        </h3>
                        <p>${item.description || 'Premium selection.'}</p>
                        <span class="rate">INR ${item.rate}</span>
                    </div>
                </div>
            `;
        }

        if (adminContainer) {
            adminContainer.innerHTML += `
                <div class="admin-item-row" style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); color:#fff; font-size:13px;">
                    <span><strong>${item.name}</strong> - ₹${item.rate}</span>
                    <button onclick="openEditMode(${JSON.stringify(item).replace(/"/g, '&quot;')})" style="cursor:pointer; background:transparent; border:none; color:#3498db; font-family:'Inter';">✏️ Edit</button>
                </div>
            `;
        }
    });
}

// ================= STORAGE AND DATA CONTROLLERS =================
async function addNewItem() {
    const name = document.getElementById('item-name').value.trim();
    const rate = document.getElementById('item-rate').value.trim();
    const item_type = document.getElementById('item-type').value; 
    const sub_category = document.getElementById('sub-category').value; 
    const description = document.getElementById('item-desc').value.trim();
    const imageFile = document.getElementById('item-img').files[0];

    if(!name || !rate || !item_type || !sub_category || !imageFile) {
        alert("Please fill all required fields and choose an image!");
        return;
    }

    const fileName = `${Date.now()}_${imageFile.name}`;
    let uploadResult = await supabaseClient.storage.from('MENU-IMAGES').upload(fileName, imageFile);
    let currentBucket = 'MENU-IMAGES';

    if (uploadResult.error) {
        uploadResult = await supabaseClient.storage.from('menu-images').upload(fileName, imageFile);
        currentBucket = 'menu-images';
    }

    if(uploadResult.error) {
        alert("Storage Upload Failed!");
        return;
    }

    const { data: urlData } = supabaseClient.storage.from(currentBucket).getPublicUrl(fileName);
    const imageUrl = urlData.publicUrl;

    const { error: dbError } = await supabaseClient
        .from('menu_items')
        .insert([{ name, rate: parseFloat(rate), item_type, sub_category, description, image_url: imageUrl }]);

    if(dbError) {
        alert("Database Entry Failed! " + dbError.message);
    } else {
        alert("🎉 Item Successfully Added to Obsidian Menu!");
        resetFormFields();
        fetchMenu();
    }
}

// ================= MUTATION CONTROLLER (EDIT / UPDATE) =================
function openEditMode(item) {
    currentEditingItemId = item.id; 
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-rate').value = item.rate;
    document.getElementById('item-type').value = item.item_type || 'Drink';
    document.getElementById('sub-category').value = item.sub_category || 'Cocktail';
    document.getElementById('item-desc').value = item.description || '';
    
    document.getElementById('add-btn').classList.add('hidden');
    document.getElementById('update-btn').classList.remove('hidden');
    document.getElementById('cancel-edit-btn').classList.remove('hidden');
    
    // Close preview if admin works on edit mode
    closeOrderModal();
    toggleAdminModal();
}

function cancelEdit() {
    currentEditingItemId = null;
    resetFormFields();
}

async function saveItemChanges() {
    if (!currentEditingItemId) return;

    const name = document.getElementById('item-name').value.trim();
    const rate = document.getElementById('item-rate').value.trim();
    const item_type = document.getElementById('item-type').value;
    const sub_category = document.getElementById('sub-category').value;
    const description = document.getElementById('item-desc').value.trim();
    const imageFile = document.getElementById('item-img').files[0];

    let imageUrl = null;

    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        let uploadResult = await supabaseClient.storage.from('MENU-IMAGES').upload(fileName, imageFile);
        let currentBucket = 'MENU-IMAGES';

        if (uploadResult.error) {
            uploadResult = await supabaseClient.storage.from('menu-images').upload(fileName, imageFile);
            currentBucket = 'menu-images';
        }

        if(!uploadResult.error) {
            const { data: urlData } = supabaseClient.storage.from(currentBucket).getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
    }

    const updateData = { name, rate: parseFloat(rate), item_type, sub_category, description };
    if (imageUrl) { updateData.image_url = imageUrl; }

    const { error: updateError } = await supabaseClient
        .from('menu_items')
        .update(updateData)
        .eq('id', currentEditingItemId);

    if (updateError) {
        alert("Update Failed! " + updateError.message);
    } else {
        alert("✍️ Item updated successfully!");
        cancelEdit();
        fetchMenu();
    }
}

function resetFormFields() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-rate').value = '';
    document.getElementById('item-type').value = 'Drink';
    document.getElementById('sub-category').value = 'Cocktail';
    document.getElementById('item-desc').value = '';
    document.getElementById('item-img').value = '';
    
    document.getElementById('add-btn').classList.remove('hidden');
    document.getElementById('update-btn').classList.add('hidden');
    document.getElementById('cancel-edit-btn').classList.add('hidden');
}

// ================= QR CODE GENERATION SYSTEM =================
let qrcodeInstance = null;
function generateMenuQR() {
    const currentUrl = window.location.href; 
    const qrContainer = document.getElementById("qrcode");
    if(qrContainer) {
        qrContainer.innerHTML = ""; 
        qrcodeInstance = new QRCode(qrContainer, {
            text: currentUrl,
            width: 180,
            height: 180,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}

function downloadQR() {
    const qrImg = document.querySelector("#qrcode img");
    if(qrImg) {
        const link = document.createElement("a");
        link.href = qrImg.src;
        link.download = "Obsidian_Menu_QR.png";
        link.click();
    } else {
        alert("QR Code not ready yet!");
    }
}

// ================= SYSTEM START INITIALIZER =================
window.onload = () => {
    // Ensuring order modal is hidden natively on load
    const modal = document.getElementById('order-modal');
    if(modal) modal.style.display = 'none';

    initSecretTrigger(); 
    initWhatsAppBooking(); 
    fetchMenu();         
};
