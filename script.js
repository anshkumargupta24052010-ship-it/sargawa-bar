// ================= FOOLPROOF SECRET TRIPLE CLICK SYSTEM =================
let clickCount = 0;
let clickTimeout;

const triggerElement = document.getElementById('secret-trigger');

if (triggerElement) {
    triggerElement.addEventListener('click', () => {
        clickCount++;
        
        // Agar 300ms ke andar dusra click nahi aaya toh counter reset ho jayega
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 400);

        // 3 baar click hote hi modal khulega
        if (clickCount === 3) {
            clickCount = 0; // reset
            toggleAdminModal();
        }
    });
}

function toggleAdminModal() {
    const modal = document.getElementById('admin-modal');
    modal.classList.toggle('hidden');
    // Generate QR automatically inside dashboard when admin modal opens
    if(!modal.classList.contains('hidden')) {
        generateMenuQR();
    }
}

function checkAdminLogin() {
    const pass = document.getElementById('admin-pass').value;
    // Apni pasand ka password yahan set kar lo (e.g. sargawa786)
    if(pass === "sargawa786") { 
        document.getElementById('admin-login-section').classList.add('hidden');
        document.getElementById('admin-dashboard-section').classList.remove('hidden');
    } else {
        alert("ACCESS DENIED: WRONG PASSWORD");
    }
}

// Add New Item Workflow (Upload Image + Add Row in Database)
async function addNewItem() {
    const type = document.getElementById('item-type').value.trim();
    const name = document.getElementById('item-name').value.trim();
    const rate = document.getElementById('item-rate').value.trim();
    const imageFile = document.getElementById('item-img').files[0];

    if(!type || !name || !rate || !imageFile) {
        alert("Please fill all typing fields and choose an image!");
        return;
    }

    // A. Image upload to Supabase Storage
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile);

    if(uploadError) {
        alert("Image Upload Failed!");
        console.error(uploadError);
        return;
    }

    // Get Public URL of the uploaded image
    const { data: urlData } = supabase.storage.from('menu-images').getPublicUrl(fileName);
    const imageUrl = urlData.publicUrl;

    // B. Save Item Data to Table
    const { error: dbError } = await supabase
        .from('menu_items')
        .insert([{ name, type, rate: parseFloat(rate), image_url: imageUrl }]);

    if(dbError) {
        alert("Database Entry Failed!");
        console.error(dbError);
    } else {
        alert("Spirit Successfully Added to Obsidian Menu!");
        toggleAdminModal();
        // Refresh values
        document.getElementById('item-type').value = '';
        document.getElementById('item-name').value = '';
        document.getElementById('item-rate').value = '';
        fetchMenu(); // Re-render menu dynamically
    }
}

// QR Code Generation
let qrcodeInstance = null;
function generateMenuQR() {
    const currentUrl = window.location.href; // Automatic picks live website URL
    const qrContainer = document.getElementById("qrcode");
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

// Run on page load
fetchMenu();