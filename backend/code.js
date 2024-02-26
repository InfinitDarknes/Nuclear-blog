/*
Dev Note-1 : Please Read Comments Before Examining the code

Dev Note-2: List of contractions used in naming variables and id/class:
- as: article section
- ast: article section title
- asi: article section image
- asl: article section list
- asv: article section video
- asa: article section audio

Dev Note-3: Explanation of some functions:
- SaveDraft(): When you click on the save button at the bottom of the page or press F2, it saves the as/ast/asi, your input contents, and tags inside the local storage.
- AutoSave(): The general-info section and Writing section have this feature. Every time you input something, it gets the ID of the element that called the function and saves its value to local storage.
- GeneralInfoDraftSaver(): Saves the content of General info Section inputs in the local storage every time you input something there.
- ContentDraftSaver(): First, it applies the content of inputs and textareas in the Writing section to their HTML tags (old-fashioned way). Then it copies the entire InnerHTML of article-sections into the local storage to be loaded on page refresh. It's a bit weird way but it works.
- TagDraftSaver(): Turns your tag input value into an array separated by new lines (), then turns it into a string connected by commas and saves it to the local storage. When you refresh the page, the LoadDraft() function replaces the commas with () and loads it back into the tag input.
- FindDraft(): Used by LoadDraft. You pass it a key name and it returns a value. If there is no key name found, it returns an empty string.
- LoadDraft(): Loads the drafted content that was defined and saved earlier and calls a function named ReNewEventListeners(). This is because some of the content it loads was created dynamically along with event listeners, but those event listeners are now gone on page refresh despite us needing the drafted content to behave the same as dynamically generated content.
*/
// General Info Section Inputs Declration
let PostDirectory = document.getElementById('post-directory');
let PostCategory = document.getElementById('post-category-pa');
let PostTitle = document.getElementById('post-title-input');
let TabTitle = document.getElementById('post-tab-title-input');
let PostDate = document.getElementById('post-date-input');
let FileName = document.getElementById('file-name-input');
let CopyRight = document.getElementById('copy-checkbox').checked;
let Comments = document.getElementById('comment-checkbox').checked;
let ImageGallery = document.getElementById('gallery-checkbox');
let ImageGallerySwitch;
// Website Style Info
let FaNameInfo = {
	FaNameColor: getComputedStyle(document.getElementById('website-name-fa')).color,
	FaNameFontFamily: getComputedStyle(document.getElementById('website-name-fa')).fontFamily,
	FaNameFontSize: getComputedStyle(document.getElementById('website-name-fa')).fontSize,
	FaNameMargin: getComputedStyle(document.getElementById('website-name-fa')).margin,
	FaNamePadding: getComputedStyle(document.getElementById('website-name-fa')).padding,
};
let EnNameInfo = {
	EnNameColor: getComputedStyle(document.getElementById('website-name-en')).color,
	EnNameFontFamily: getComputedStyle(document.getElementById('website-name-en')).fontFamily,
	EnNameFontSize: getComputedStyle(document.getElementById('website-name-en')).fontSize,
	EnNameMargin: getComputedStyle(document.getElementById('website-name-en')).margin,
	EnNamePadding: getComputedStyle(document.getElementById('website-name-en')).padding,
};
let LogoInfo = {
	LogoColor: getComputedStyle(document.getElementById('website-logo')).color,
	LogoFontSize: getComputedStyle(document.getElementById('website-logo')).fontSize,
	LogoMargin: getComputedStyle(document.getElementById('website-logo')).margin,
	LogoPadding: getComputedStyle(document.getElementById('website-logo')).padding,
};
//
let Tags = document.getElementById('tag-input');
let ArticleSections = document.getElementById('article-sections');
let ArticleSectionCount = 0;
let ArticleParagraphCount = 0;
let ArticleListCount = 0;
let ArticleImageCount = 0;
let Priority = 0;
let DateString;
let selected = ''; // Witch Element in the Writing Section is Selected Now ? it could be an asi/ast/as/asl/asv/asa
let CategoryDataB = [
	'ایران=https://x.com/posts/Iran',
	'هسته ای=https://x.com/posts/Nuclear',
	'گرما هسته ای=https://x.com/posts/ThermoNuclear',
	'هیدروژنی=https://x.com/posts/ThermoNuclear',
	'موشک بالستیک=https://x.com/posts/BallisticMissile',
	'موشک کروز=https://x.com/posts/CruiseMissile',
	'راکت=https://x.com/posts/Rocket',
	'موشک قاره پیما=https://x.com/posts/ICBM',
	'موشک ماهواره بر=https://x.com/posts/SVL',
	'ماهواره=https://x.com/posts/Sat',
	'رادار=https://x.com/posts/Radar',
	'پدافند=https://x.com/posts/AD',
	'هند=https://x.com/posts/India',
	'پاکستان=https://x.com/posts/Pakistan',
	'آمریکا=https://x.com/posts/USA',
	'فرانسه=https://x.com/posts/France',
	'چین=https://x.com/posts/China',
	'روسیه=https://x.com/posts/Russia',
	'کره شمالی=https://x.com/posts/NorthKorea',
];
let SidebarItemsId = ['add-post', 'management-section'];
let SettingItemsId = ['main-page-setting', 'header-setting', 'footer-setting', 'sidebar-setting', 'menu-setting', 'tags-setting', 'recommended-posts-setting', 'users-setting', 'comments-setting', 'website-traffic-setting'];
(function DateCalc() {
	let date = new Date().getTime();
	let toMiliSec = 30 * 24 * 60 * 60 * 1000;
	let NewDate = date + toMiliSec;
	DateString = new Date(NewDate).toUTCString();
})();
function ElementCounter() {
	// Dev Note : This function Runs everytime the LoadDraft function Loads aswell as everytime you add an articleSection/Image/Paragraph/List/Video/Audio
	// Task of this function is to count how many of each Element exist and also adds the correct id+number to them based on order they come after one another
	let ArticleSections = document.querySelectorAll('.article-section');
	let ArticleSectionParagraph = document.querySelectorAll('.article-text-input');
	let ArticleSectionImage = document.querySelectorAll('.container-asi');
	let ArticleSectionTitles = document.querySelectorAll('.article-section-title');
	let ArticleListContainers = document.querySelectorAll('.article-list-container');
	ArticleSectionCount = ArticleSections.length;
	ArticleParagraphCount = ArticleSectionParagraph.length;
	ArticleImageCount = ArticleSectionImage.length;
	ArticleListCount = ArticleListContainers.length;
	for (n = 0; n < ArticleSections.length; n++) {
		ArticleSections[n].id = `as-${n}`;
	}
	for (n = 0; n < ArticleSectionParagraph.length; n++) {
		ArticleSectionParagraph[n].id = `paragraph-${n}`;
	}
	for (n = 0; n < ArticleSectionImage.length; n++) {
		ArticleSectionImage[n].id = `asi-${n}`;
	}
	for (n = 0; n < ArticleSectionTitles.length; n++) {
		ArticleSectionTitles[n].id = `ast-${n}`;
	}
	for (n = 0; n < ArticleListContainers.length; n++) {
		ArticleListContainers[n].id = `al-${n}`;
	}
}
function SwitchTabs(caller) {
	switch (caller) {
		case 'add-post':
			for (n = 0; n < SidebarItemsId.length; n++) {
				if (n == 0) {
					continue;
				} else {
					document.getElementById(SidebarItemsId[n]).style.display = 'none';
					document.getElementById(SidebarItemsId[0]).style.display = 'flex';
					localStorage.setItem('CurrentTab', caller);
				}
			}
			break;
		case 'management-section':
			for (n = 0; n < SidebarItemsId.length; n++) {
				if (n == 1) {
					continue;
				} else {
					document.getElementById(SidebarItemsId[n]).style.display = 'none';
					document.getElementById(SidebarItemsId[1]).style.display = 'flex';
					localStorage.setItem('CurrentTab', caller);
				}
			}
			break;
	}
}
function SwitchSettingTabs(caller) {
	switch (caller) {
		case 'main-page-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 0) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[0]).style.display = 'flex';
				}
			}
			break;
		case 'header-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 1) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[1]).style.display = 'flex';
				}
			}
			break;

		case 'footer-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 2) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[2]).style.display = 'flex';
				}
			}
			break;

		case 'sidebar-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 3) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[3]).style.display = 'flex';
				}
			}
			break;

		case 'menu-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 4) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[4]).style.display = 'flex';
				}
			}
			break;

		case 'tags-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 5) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[5]).style.display = 'flex';
				}
			}
			break;

		case 'recommended-posts-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 6) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[6]).style.display = 'flex';
				}
			}
			break;

		case 'users-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 7) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[7]).style.display = 'flex';
				}
			}
			break;

		case 'comments-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 8) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[8]).style.display = 'flex';
				}
			}
			break;

		case 'website-traffic-setting':
			for (n = 0; n < SettingItemsId.length; n++) {
				if (n == 9) {
					continue;
				} else {
					document.getElementById(SettingItemsId[n]).style.display = 'none';
					document.getElementById(SettingItemsId[9]).style.display = 'flex';
				}
			}
			break;
	}
}
function DisplayEditMenu(caller) {
	let EditMenu = document.createElement('section');
	EditMenu.id = 'edit-menu';
	let TextInput = document.createElement('input');
	let CloseBtn = document.createElement('button');
	CloseBtn.className = 'close-btn';
	CloseBtn.innerHTML = '<i class="fa fa-close"></i>';
	EditMenu.appendChild(CloseBtn);
	TextInput.type = 'text';
	TextInput.id = 'text-input';
	TextInput.placeholder = 'متن';
	let PickColor = document.createElement('input');
	PickColor.type = 'color';
	PickColor.id = 'pick-color';
	let FontSize = document.createElement('input');
	FontSize.type = 'text';
	FontSize.id = 'font-size';
	FontSize.placeholder = 'فونت سایز';
	let Margin = document.createElement('input');
	Margin.type = 'text';
	Margin.id = 'margin';
	Margin.placeholder = '0 0 0 0';
	let Padding = document.createElement('input');
	Padding.type = 'text';
	Padding.id = 'padding';
	Padding.placeholder = '0 0 0 0';
	let Href = document.createElement('input');
	Href.type = 'text';
	Href.id = 'href';
	Href.placeholder = 'Link';
	switch (caller) {
		case 'website-logo':
			if (document.getElementById('edit-menu')) {
				document.getElementById('edit-menu').remove();
			}
			EditMenu.appendChild(PickColor);
			PickColor.value = getComputedStyle(document.getElementById(caller)).color;
			EditMenu.appendChild(FontSize);
			FontSize.value = getComputedStyle(document.getElementById(caller)).fontSize;
			EditMenu.appendChild(Margin);
			Margin.value = getComputedStyle(document.getElementById(caller)).margin;
			EditMenu.appendChild(Padding);
			Padding.value = getComputedStyle(document.getElementById(caller)).padding;
			document.getElementById('management-section').appendChild(EditMenu);
			// EditMenu.appendChild(Href);
			// Href.value = getComputedStyle(document.getElementById('website-logo'));
			break;

		case 'website-name-fa':
			if (document.getElementById('edit-menu')) {
				document.getElementById('edit-menu').remove();
			}
			EditMenu.appendChild(document.createTextNode('متن'));
			EditMenu.appendChild(TextInput);
			TextInput.value = document.getElementById(caller).textContent.trim();
			EditMenu.appendChild(document.createTextNode('رنگ متن :'));
			EditMenu.appendChild(PickColor);
			PickColor.value = getComputedStyle(document.getElementById(caller)).color;
			EditMenu.appendChild(document.createTextNode('اندازه متن :'));
			EditMenu.appendChild(FontSize);
			FontSize.value = getComputedStyle(document.getElementById(caller)).fontSize;
			EditMenu.appendChild(document.createTextNode('مارجین :'));
			EditMenu.appendChild(Margin);
			Margin.value = getComputedStyle(document.getElementById(caller)).margin;
			EditMenu.appendChild(document.createTextNode('پدینگ :'));
			EditMenu.appendChild(Padding);
			Padding.value = getComputedStyle(document.getElementById(caller)).padding;

			document.getElementById('management-section').appendChild(EditMenu);
			break;
		case 'website-name-en':
			if (document.getElementById('edit-menu')) {
				document.getElementById('edit-menu').remove();
			}
			EditMenu.appendChild(document.createTextNode('متن'));
			EditMenu.appendChild(TextInput);
			TextInput.value = document.getElementById(caller).textContent.trim();
			EditMenu.appendChild(document.createTextNode('رنگ متن :'));
			EditMenu.appendChild(PickColor);
			PickColor.value = getComputedStyle(document.getElementById(caller)).color.toString();
			EditMenu.appendChild(document.createTextNode('اندازه متن :'));
			EditMenu.appendChild(FontSize);
			FontSize.value = getComputedStyle(document.getElementById(caller)).fontSize;
			EditMenu.appendChild(document.createTextNode('مارجین :'));
			EditMenu.appendChild(Margin);
			Margin.value = getComputedStyle(document.getElementById(caller)).margin;
			EditMenu.appendChild(document.createTextNode('پدینگ :'));
			EditMenu.appendChild(Padding);
			Padding.value = getComputedStyle(document.getElementById(caller)).padding;
			document.getElementById('management-section').appendChild(EditMenu);
			break;
	}
}
function CreateDoc() {
	(function GeneralInfoPacker() {
		if (PostCategory.value === '' || PostDirectory.value === '' || PostDate.value === '' || PostTitle.value === '' || TabTitle.value === '' || FileName.value === '') {
			alert('Please Complete General Info Section First');
		} else {
			ContentPacker();
		}
	})();

	function ContentPacker() {
		if (ArticleSectionCount < 1) {
			alert('Please add at least one article section');
		} else {
			CheckTitles();
			function CheckTitles() {
				for (n = 0; n < document.querySelectorAll('.article-section-title').length; n++) {
					if (document.querySelectorAll('.article-section-title')[n].value == '') {
						alert('Please Fill All The Titles');
						n = document.querySelectorAll('.article-section-title').length;
					} else if (document.querySelectorAll('.article-section-title')[n].value != '' && n + 1 == document.querySelectorAll('.article-section-title').length) {
						CheckParagraphs();
					}
				}
			}
			function CheckParagraphs() {
				for (n = 0; n < document.querySelectorAll('.article-text-input').length; n++) {
					if (document.querySelectorAll('.article-text-input')[n].value == '') {
						alert('Please Fill All The Paragraphs');
						n = document.querySelectorAll('.article-text-input').length;
					} else if (document.querySelectorAll('.article-text-input')[n].value != '' && n + 1 == document.querySelectorAll('.article-text-input').length) {
						CheckImages();
					}
				}
			}
			function CheckImages() {
				if (document.querySelectorAll('.asi-upload').length == 0) {
					CreateBody();
				} else {
					for (n = 0; n < document.querySelectorAll('.asi-upload').length; n++) {
						if (document.querySelectorAll('.asi-upload')[n].files.length == 0) {
							alert('Please Upload your Images or delete the Image Section');
							n = document.querySelectorAll('.asi-upload').length;
						} else if (document.querySelectorAll('.asi-upload')[n].files.length != 0 && n == document.querySelectorAll('.asi-upload').length) {
							CreateBody();
						}
					}
				}
			}
			function CreateBody() {
				// Row/Main/aside
				let Row = document.createElement('section');
				Row.id = 'row';
				let Main = document.createElement('main');
				let sideBar = document.createElement('aside');
				Row.appendChild(Main);
				Row.appendChild(sideBar);
				// Content
				let Content = document.createElement('section');
				Content.id = 'content';
				Main.appendChild(Content);
				// article header
				let ArticleHeader = document.createElement('section');
				ArticleHeader.id = 'article-header';
				Content.appendChild(ArticleHeader);
				// article thumbnail
				let ArticleThumbnailContainer = document.createElement('section');
				ArticleThumbnailContainer.id = 'article-thumbnail-container';
				Content.appendChild(ArticleThumbnailContainer);
				// teaxtarea
				let TextArea = document.createElement('section');
				TextArea.id = 'textarea';
				Content.appendChild(TextArea);
				// article bottom
				let ArticleBottom = document.createElement('section');
				ArticleBottom.id = 'article-bottom';
				Content.appendChild(ArticleBottom);
				// article header Content
				let ArticleInfoContainer = document.createElement('section');
				ArticleInfoContainer.id = 'article-info-container';
				let ArticleTitle = document.createElement('span');
				ArticleTitle.id = 'article-title';
				ArticleTitle.className = 'title';
				ArticleTitle.textContent = PostTitle.value.toString();
				let ArticleDate = document.createElement('span');
				ArticleDate.className = 'date';
				ArticleDate.id = 'article-date';
				ArticleDate.textContent = PostDate.value.toString();
				let CategoryPa = document.createElement('div');
				CategoryPa.className = 'category-pa';
				let PostCategoryArray = PostCategory.value.split('/');
				for (n = 0; n < PostCategoryArray.length; n++) {
					let CategoryPaLink = document.createElement('a');
					CategoryPaLink.className = 'category-pa-name';
					CategoryPaLink.textContent = PostCategoryArray[n];
					CategoryPa.appendChild(CategoryPaLink);
				}
				let ArticleTools = document.createElement('section');
				ArticleTools.id = 'article-tools';
				let DownPdfBtn = document.createElement('button');
				DownPdfBtn.id = 'download-pdf-btn';
				DownPdfBtn.innerHTML = '<i class="fa fa-download"></i>';
				DownPdfBtn.setAttribute('title', 'بارگیری پست به شکل پی دی اف');
				let ShareBtn = document.createElement('button');
				ShareBtn.id = 'download-pdf-btn';
				ShareBtn.innerHTML = '<i class="fa fa-share"></i>';
				ShareBtn.setAttribute('title', 'همرسانی');
				ArticleHeader.appendChild(ArticleInfoContainer);
				ArticleHeader.appendChild(ArticleTools);
				ArticleInfoContainer.appendChild(ArticleTitle);
				ArticleInfoContainer.appendChild(ArticleDate);
				ArticleInfoContainer.appendChild(CategoryPa);
				ArticleTools.appendChild(DownPdfBtn);
				ArticleTools.appendChild(ShareBtn);
				// article bottom 1
				let ArticleBottomColumn1 = document.createElement('section');
				ArticleBottomColumn1.className = 'article-bottom-column';
				ArticleBottomColumn1.id = 'article-bottom-column-1';
				ArticleBottom.appendChild(ArticleBottomColumn1);
				let ArticleBottomColumn2 = document.createElement('section');
				ArticleBottomColumn2.className = 'article-bottom-column';
				ArticleBottomColumn2.id = 'article-bottom-column-2';
				ArticleBottom.appendChild(ArticleBottomColumn2);
				// post tags
				let postTags = document.createElement('section');
				postTags.id = 'post-tags';
				ArticleBottomColumn1.appendChild(postTags);
				let postTagsHeading = document.createElement('span');
				postTagsHeading.id = 'post-tags-heading';
				postTagsHeading.innerHTML = '<i class="fas fa-tags"></i>برچسب ها';
				postTags.appendChild(postTagsHeading);
				let tags = document.getElementById('tag-input').value.split('\n');
				let tagsContainer = document.createElement('section');
				tagsContainer.id = 'tags-container';
				postTags.appendChild(tagsContainer);
				for (n in tags) {
					let h3Tag = document.createElement('h3');
					h3Tag.className = 'tag';
					let h3TagLink = document.createElement('a');
					h3TagLink.className = 'tag-link';
					h3TagLink.innerText = tags[n];
					let name = tags[n] + '=';
					hrefFinder(name);
					h3TagLink.href = hrefFinder(name);
					h3Tag.appendChild(h3TagLink);
					tagsContainer.appendChild(h3Tag);
				}
				function hrefFinder(name) {
					for (n in CategoryDataB) {
						if (CategoryDataB[n].startsWith(name)) {
							let tagHref = CategoryDataB[n].substring(name.length);
							return tagHref;
						}
					}
				}
				// article author info container
				let ArticleAuthorInfoContainer = document.createElement('section');
				ArticleAuthorInfoContainer.id = 'article-author-info-container';
				ArticleBottomColumn1.appendChild(ArticleAuthorInfoContainer);
				let AuthorProfile = document.createElement('section');
				AuthorProfile.id = 'author-profile';
				ArticleAuthorInfoContainer.appendChild(AuthorProfile);
				let AuthorImage = document.createElement('img');
				AuthorImage.id = 'author-image';
				AuthorProfile.appendChild(AuthorImage);
				let AuthorName = document.createElement('span');
				AuthorName.id = 'author-name';
				AuthorProfile.appendChild(AuthorName);
				let ContactAuthorBtn = document.createElement('button');
				ContactAuthorBtn.id = 'contact-author-btn';
				ContactAuthorBtn.innerHTML = '<i class="fa fa-message m-0"></i>';
				ArticleAuthorInfoContainer.appendChild(ContactAuthorBtn);
				// article thumbnail Content
				let ArticleThumbnailFigure = document.createElement('figure');
				ArticleThumbnailFigure.id = 'article-thumbnail-figure';
				ArticleThumbnailContainer.appendChild(ArticleThumbnailFigure);
				let ArticleThumbnail = document.createElement('img');
				ArticleThumbnail.id = 'article-thumbnail';
				ArticleThumbnail.alt = document.getElementById('at-alt').value.toString();
				ArticleThumbnail.src = URL.createObjectURL(document.getElementById('at-upload').files[0]);
				ArticleThumbnail.title = document.getElementById('at-title').value.toString();
				ArticleThumbnailFigure.appendChild(ArticleThumbnail);
				let ArticleThumbnailCaption = document.createElement('figcaption');
				ArticleThumbnailCaption.id = 'article-thumbnail-figcaption';
				ArticleThumbnailCaption.innerHTML = document.getElementById('at-caption').value.toString();
				ArticleThumbnailFigure.appendChild(ArticleThumbnailCaption);
				// creating article sections
				let ArticleSections = Array.from(document.getElementsByClassName('article-section'));
				let ArticleSectionTitles = document.getElementsByClassName('article-section-title');
				let ParagraphLimit;
				for (let n = 0; n < ArticleSections.length; n++) {
					let ArticleSection = document.createElement('section');
					ArticleSection.className = 'article-section';
					TextArea.appendChild(ArticleSection);
					let ArticleSectionTitle = document.createElement('h2');
					ArticleSectionTitle.className = 'sub-title title';
					ArticleSection.appendChild(ArticleSectionTitle);
					let ParagraphLimiter = ArticleSections[n].querySelectorAll('.article-text-input');
					ParagraphLimit = ParagraphLimiter;
					for (let x = 0; x < ParagraphLimit.length; x++) {
						console.log(ParagraphLimit.length);
						var ArticleSectionParagraph = document.createElement('p');
						ArticleSectionParagraph.className = 'text article-text';
						if (CopyRight == false) {
							ArticleSectionParagraph.setAttribute('inert', '');
						}
						ArticleSection.appendChild(ArticleSectionParagraph);
						ArticleSectionParagraph.innerHTML = ArticleSections[n].querySelectorAll('.article-text-input')[x].value;
					}
					ArticleSectionTitle.innerText = ArticleSectionTitles[n].value;
				}
				navigator.clipboard.writeText(Row.outerHTML.toString());
				alert('Row copied to clipboard');
			}
		}
	}
}
function AddArticleSection() {
	let ArticleSection = document.createElement('section');
	let ArticleSectionTitle = document.createElement('input');
	let ArticleSectionText = document.createElement('textarea');
	ArticleSection.className = 'article-section';
	ArticleSectionTitle.type = 'text';
	ArticleSectionTitle.className = 'article-section-title';
	ArticleSectionTitle.setAttribute('placeholder', 'عنوان بخش');
	ArticleSectionText.className = 'article-text-input';
	ArticleSectionText.setAttribute('placeholder', 'متن این بخش');
	ArticleSection.appendChild(ArticleSectionTitle);
	ArticleSection.appendChild(ArticleSectionText);
	if (selected === undefined || selected === null || ArticleSectionCount == 0) {
		document.getElementById('article-sections').appendChild(ArticleSection);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleSection;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	} else {
		document.getElementById(selected.id.toString()).parentNode.insertBefore(ArticleSection, document.getElementById(selected.id.toString()).nextSibling);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleSection;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	}
}
function AddParagragh() {
	if (selected === undefined || selected === null) {
		alert('Selected is Undefined');
	} else if (selected.className == 'article-section') {
		let ArticleTextInput = document.createElement('textArea');
		ArticleTextInput.className = 'article-text-input';
		ArticleTextInput.setAttribute('placeholder', 'متن این بخش');
		selected.appendChild(ArticleTextInput);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleTextInput;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	} else if (selected.className == 'article-text-input' || selected.className == 'container-asi') {
		let ArticleTextInput = document.createElement('textArea');
		ArticleTextInput.className = 'article-text-input';
		ArticleTextInput.setAttribute('placeholder', 'متن این بخش');
		selected.parentNode.insertBefore(ArticleTextInput, selected.nextSibling);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleTextInput;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	}
}
function AddList() {
	if (selected === undefined || selected === null) {
		alert('Selected is Undefined');
	} else if (selected.className == 'article-section') {
		let ArticleListContainer = document.createElement('section');
		ArticleListContainer.contentEditable = true;
		ArticleListContainer.className = 'article-list-container';
		let ArticleListInput = document.createElement('ul');
		ArticleListInput.className = 'article-list';
		ArticleListContainer.appendChild(ArticleListInput);
		let ArticleListItem = document.createElement('li');
		ArticleListItem.className = 'article-list-item';
		ArticleListInput.appendChild(ArticleListItem);
		selected.appendChild(ArticleListContainer);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleListContainer;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	} else if (selected.className == 'article-text-input' || selected.className == 'container-asi') {
		let ArticleListContainer = document.createElement('section');
		ArticleListContainer.contentEditable = true;
		ArticleListContainer.className = 'article-list-container';
		let ArticleListInput = document.createElement('ul');
		ArticleListInput.className = 'article-list';
		ArticleListContainer.appendChild(ArticleListInput);
		let ArticleListItem = document.createElement('li');
		ArticleListItem.className = 'article-list-item';
		ArticleListInput.appendChild(ArticleListItem);
		selected.parentNode.insertBefore(ArticleListContainer, selected.nextSibling);
		ReNewEventListeners();
		ElementCounter();
		selected = ArticleListContainer;
		SelectedElementDraft(selected.id);
		HighLightSelectedElement(selected.id);
		SaveDraft('SaveByBtn');
	}
}
function ListWatcher(action, element) {
	// stops the last empty li from being removed by user from container
	let List = element.childNodes[0];
	let ItemCounter = List.getElementsByTagName('li');
	if (action.keyCode == 13) {
		for (n = 0; n < ItemCounter.length; n++) {
			if (ItemCounter[n].innerText.trim() === '') {
				action.preventDefault();
			}
		}
	}
	if (action.keyCode == 46 || action.keyCode == 8) {
		if (ItemCounter.length == 1 && ItemCounter[0].innerText.trim() === '') {
			action.preventDefault();
		}
	}
}
function AddSectionImage() {
	let ContainerAsi = document.createElement('section');
	ContainerAsi.className = 'container-asi';
	let ContainerAsiInner = document.createElement('section');
	ContainerAsiInner.className = 'container-asi-inner';
	ContainerAsi.appendChild(ContainerAsiInner);
	let AsiUpload = document.createElement('input');
	AsiUpload.type = 'file';
	AsiUpload.className = 'asi-upload';
	ContainerAsiInner.appendChild(AsiUpload);
	let AsiAlt = document.createElement('input');
	AsiAlt.type = 'text';
	AsiAlt.className = 'asi-alt';
	AsiAlt.placeholder = 'alt';
	ContainerAsiInner.appendChild(AsiAlt);
	let AsiTitle = document.createElement('input');
	AsiTitle.type = 'text';
	AsiTitle.className = 'asi-title';
	AsiTitle.placeholder = 'title';
	ContainerAsiInner.appendChild(AsiTitle);
	let AsiCaption = document.createElement('input');
	AsiCaption.type = 'text';
	AsiCaption.className = 'asi-caption';
	AsiCaption.placeholder = 'caption';
	ContainerAsiInner.appendChild(AsiCaption);
	if (ImageGallerySwitch === false) {
		if (selected === null || selected === undefined || selected == '' || selected.className == 'article-section') {
			alert('Please Select an Element( Not Section )');
		} else {
			document.getElementById(selected.id).parentNode.insertBefore(ContainerAsi, document.getElementById(selected.id).nextSibling);
			ElementCounter();
			ReNewEventListeners();
			SaveDraft('SaveByBtn');
		}
	} else if (ImageGallerySwitch) {
		document.getElementById(selected.id).insertBefore(ContainerAsi, document.getElementById(selected.id).childNodes[0].nextSibling);
		ElementCounter();
		ReNewEventListeners();
		SaveDraft('SaveByBtn');
	}
}
function Deleter(element) {
	if (element.includes('as-')) {
		document.getElementById(element).remove();
		SelectedReseter(element);
		ElementCounter();
		SaveDraft('SaveByBtn');
	} else if (element.includes('paragraph-')) {
		let Element = document.getElementById(element);
		if (Element.parentNode.querySelectorAll('.article-text-input').length == 1) {
			Element.parentNode.remove();
			ElementCounter();
			SelectedReseter(element);
			SaveDraft('SaveByBtn');
		} else {
			document.getElementById(element).remove();
			ElementCounter();
			SelectedReseter(element);
			SaveDraft('SaveByBtn');
		}
	} else if (element.includes('asi-')) {
		document.getElementById(element).remove();
		ElementCounter();
		SelectedReseter(element);
		SaveDraft('SaveByBtn');
	} else if (element.includes('al-')) {
		document.getElementById(element).remove();
		ElementCounter();
		SelectedReseter(element);
		SaveDraft('SaveByBtn');
	}
}
function SelectedReseter(element) {
	if (selected == undefined) {
	} else if (element == selected.id) {
		selected = null;
	}
}
function Selector(element) {
	selected = document.getElementById(element);
	SelectedElementDraft(element);
	HighLightSelectedElement(element);
}
function HighLightSelectedElement(element) {
	// this function purpose is to change Bg color of selected element
	if (element.includes('paragraph-')) {
		document.getElementById(element).style.borderRight = 'goldenrod solid 3px';
		document.getElementById(element).style.opacity = '1';
		document.getElementById(element).style.width = 'calc(100% - 53px)';
		document.getElementById(element).style.marginRight = '20px';
	}
	if (element.includes('as-')) {
		document.getElementById(element).childNodes[0].style.borderRight = 'goldenrod 6px solid';
		document.getElementById(element).childNodes[0].style.width = 'calc(100% - 6px)';
	}
	ResetHighLightedElements(element);
}
function ResetHighLightedElements(element) {
	let EveryElement = ArticleSections.querySelectorAll('*');
	for (n = 0; n < EveryElement.length; n++) {
		if (!selected) {
			if (getComputedStyle(EveryElement[n]).marginRight === '20px') {
				EveryElement[n].style.opacity = '0.8';
				EveryElement[n].style.borderRight = '0';
				EveryElement[n].style.width = 'calc(100% - 30px)';
				EveryElement[n].style.marginRight = '0';
			} else if (getComputedStyle(EveryElement[n]).borderRightWidth == '6px') {
				EveryElement[n].style.borderRight = '0';
				EveryElement[n].style.width = '100%';
			}
		} else if (getComputedStyle(EveryElement[n]).marginRight === '20px' && EveryElement[n].id != selected.id) {
			EveryElement[n].style.opacity = '0.8';
			EveryElement[n].style.borderRight = '0';
			EveryElement[n].style.width = 'calc(100% - 30px)';
			EveryElement[n].style.marginRight = '0';
		} else if (getComputedStyle(EveryElement[n]).borderRightWidth == '6px' && EveryElement[n].parentNode.id !== selected.id) {
			EveryElement[n].style.borderRight = '0';
			EveryElement[n].style.width = '100%';
		}
	}
	localStorage.setItem('selected', element);
	SaveDraft('SaveByBtn');
}
// Adding Listeners
{
	PostDirectory.addEventListener('input', AutoSave);
	PostCategory.addEventListener('input', AutoSave);
	FileName.addEventListener('input', AutoSave);
	PostTitle.addEventListener('input', AutoSave);
	TabTitle.addEventListener('input', AutoSave);
	PostDate.addEventListener('change', AutoSave);
	ImageGallery.addEventListener('change', function () {
		if (this.checked === true) {
			ImageGallerySwitch = true;
		} else {
			ImageGallerySwitch = false;
		}
		localStorage.setItem('ImageGallerySwitch', this.checked);
	});
	document.addEventListener('keydown', function (action) {
		SaveDraft(action);
	});
	document.addEventListener('keydown', function (action) {
		if (action.keyCode == 114) {
			action.preventDefault();
			let RemoveDraftPrompt = prompt('1-Post Directory \n 2-Post Category \n 3-File Name \n 4-Post Title \n 5-Tab Title \n 6-Post Date \n 7-Tags \n 8-Clear Everything');
			if (RemoveDraftPrompt == 1) {
				localStorage.removeItem('post-directory');
				ToBeRemoveDraft = 'post-directory';
				LoadDraft();
			} else if (RemoveDraftPrompt == 2) {
				localStorage.removeItem('post-category-pa');
				LoadDraft();
			} else if (RemoveDraftPrompt == 3) {
				localStorage.removeItem('file-name-input');
				LoadDraft();
			} else if (RemoveDraftPrompt == 4) {
				localStorage.removeItem('post-title-input');
				LoadDraft();
			} else if (RemoveDraftPrompt == 5) {
				localStorage.removeItem('post-tab-title-input');
				LoadDraft();
			} else if (RemoveDraftPrompt == 6) {
				localStorage.removeItem('post-date-input');
				LoadDraft();
			} else if (RemoveDraftPrompt == 7) {
				localStorage.removeItem('tag-input');
				LoadDraft();
				LoadDraft();
			} else if (RemoveDraftPrompt == 8) {
				localStorage.clear();
				LoadDraft();
			} else {
				alert('Invalid Reasponse Draft has not been changed.');
			}
		} else if (action.keyCode == 115) {
			let CleanStorgeConf = confirm('Are yoo Sure you Wanna Clear your Draft?');
			if (CleanStorgeConf === true) {
				localStorage.clear();
				LoadDraft();
			}
		}
	});
	document.addEventListener('click', function (action) {
		HideCustomMenu(action);
	});
	document.addEventListener('contextmenu', function (action) {
		HideCustomMenu(action);
	});
	window.addEventListener('scroll', function (action) {
		HideCustomMenu(action);
	});
}
function SaveDraft(action) {
	if (action.keyCode == 113) {
		action.preventDefault();
		GeneralInfoDraftSaver();
		ContentDraftSaver();
		TagDraftSaver();
		console.log('Saved');
	} else if (action == 'SaveByBtn') {
		GeneralInfoDraftSaver();
		ContentDraftSaver();
		TagDraftSaver();
		console.log('Saved');
	}
}
function AutoSave(caller) {
	localStorage.setItem(caller.target.id, caller.target.value);
}
function GeneralInfoDraftSaver() {
	localStorage.setItem('post-directory', PostDirectory.value);
	localStorage.setItem('post-category-pa', PostCategory.value);
	localStorage.setItem('file-name-input', FileName.value);
	localStorage.setItem('post-title-input', PostTitle.value);
	localStorage.setItem('post-tab-title-input', TabTitle.value);
	localStorage.setItem('post-date-input', PostDate.value);
}
function ContentDraftSaver() {
	let ArticleSectionTitles = Array.from(document.getElementsByClassName('article-section-title'));
	ArticleSectionTitles.forEach((element) => {
		element.setAttribute('value', element.value);
	});
	let ArticleTextInputs = Array.from(document.getElementsByClassName('article-text-input'));
	ArticleTextInputs.forEach((element) => {
		element.innerHTML = element.value;
	});
	ArticleSectionCount = Array.from(document.querySelectorAll('.article-section')).length;
	localStorage.setItem('article-sections', document.getElementById('article-sections').innerHTML);
}
function TagDraftSaver() {
	let TagString = '';
	let TagsArray = Tags.value.split('\n').filter(DelEmptyLine);
	function DelEmptyLine(Line) {
		return Line !== '';
	}
	Tags.value = TagsArray.join('\n');
	for (n = 0; n < TagsArray.length; n++) {
		if (n == TagsArray.length - 1) {
			TagString += TagsArray[n];
		} else {
			TagString += TagsArray[n] + ',';
		}
	}
	localStorage.setItem('tag-input', TagString);
	TagString = '';
}
function SelectedElementDraft(element) {
	localStorage.setItem('selected', element);
}
function FindDraft(name) {
	if (localStorage.getItem(name) !== null) {
		return localStorage.getItem(name);
	} else {
		return '';
	}
}
function LoadDraft() {
	console.log(FindDraft('CurrentTab'));
	PostDirectory.value = FindDraft('post-directory');
	PostCategory.value = FindDraft('post-category-pa');
	FileName.value = FindDraft('file-name-input');
	PostTitle.value = FindDraft('post-title-input');
	TabTitle.value = FindDraft('post-tab-title-input');
	if (FindDraft('post-date-input') == '') {
		let date = new Date();
		let Today = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
		PostDate.value = Today;
	} else if (FindDraft('post-date-input') != null) {
		PostDate.value = FindDraft('post-date-input');
	}
	Tags.value = FindDraft('tag-input').replace(/,/g, '\n');
	ArticleSections.innerHTML = FindDraft('article-sections');
	selected = document.getElementById(FindDraft('selected'));
	ImageGallerySwitch = FindDraft('ImageGallerySwitch');
	switch (FindDraft('CurrentTab')) {
		case 'add-post':
			for (n = 0; n < SidebarItemsId.length; n++) {
				if (n == 0) {
					continue;
				} else {
					document.getElementById(SidebarItemsId[n]).style.display = 'none';
					document.getElementById(SidebarItemsId[0]).style.display = 'flex';
				}
			}
			break;
		case 'management-section':
			for (n = 0; n < SidebarItemsId.length; n++) {
				if (n == 1) {
					continue;
				} else {
					document.getElementById(SidebarItemsId[n]).style.display = 'none';
					document.getElementById(SidebarItemsId[1]).style.display = 'flex';
				}
			}
			break;
	}
	ReNewEventListeners();
	ElementCounter();
}
function DisplayCustomMenu(action) {
	action.preventDefault();
	if (document.getElementById('custom-menu')) {
		document.getElementById('custom-menu').remove();
	}
	let CurrentElementId = action.target.id;
	let CurrentElement = action.target;
	let CustomMenu = document.createElement('section');
	CustomMenu.id = 'custom-menu';
	let CopyBtn = document.createElement('button');
	CopyBtn.id = 'copy-btn';
	CopyBtn.addEventListener('click', function () {
		Copy(CurrentElementId);
	});
	CustomMenu.appendChild(CopyBtn);
	let PasteBtn = document.createElement('button');
	PasteBtn.id = 'paste-btn';
	PasteBtn.addEventListener('click', function () {
		Paste(CurrentElementId);
	});
	CustomMenu.appendChild(PasteBtn);
	let SelectBtn = document.createElement('button');
	SelectBtn.id = 'select-btn';
	CustomMenu.appendChild(SelectBtn);
	let DeleteBtn = document.createElement('button');
	DeleteBtn.id = 'delete-btn';
	CustomMenu.appendChild(DeleteBtn);
	CustomMenu.style.position = 'fixed';
	CustomMenu.style.top = action.clientY + 'px';
	CustomMenu.style.left = action.clientX + 'px';
	document.body.appendChild(CustomMenu);
	if (action.target.className === 'article-section-title') {
		CopyBtn.innerHTML = "<i class='fa fa-copy' style='margin-left:8px;color:#c5bebe'></i>" + 'کپی';
		PasteBtn.innerHTML = "<i class='fa fa-paste' style='margin-left:8px;color:#c5bebe'></i>" + 'جایگذاری';
		DeleteBtn.innerHTML = "<i class='fa fa-trash' style='margin-left:8px;color:orange'></i>" + 'حذف سکشن';
		if (selected) {
			if (CurrentElement.parentNode.id == selected.id) {
				SelectBtn.innerHTML = "<i class='fa fa-times-circle' style='margin-left:8px;color:red'></i>" + 'لغو انتخاب';
				SelectBtn.addEventListener('click', function () {
					SelectedReseter(CurrentElement.parentNode.id);
					ResetHighLightedElements();
				});
			} else {
				SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:orange'></i>" + 'انتخاب سکشن';
				SelectBtn.addEventListener('click', function () {
					Selector(CurrentElement.parentNode.id);
				});
			}
		} else {
			SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:lime'></i>" + 'انتخاب سکشن';
			SelectBtn.addEventListener('click', function () {
				Selector(CurrentElement.parentNode.id);
			});
		}

		DeleteBtn.addEventListener('click', function () {
			Deleter(CurrentElement.parentNode.id);
		});
	} else if (action.target.className === 'article-text-input') {
		CopyBtn.innerHTML = "<i class='fa fa-copy' style='margin-left:8px;color:#c5bebe'></i>" + 'کپی';
		PasteBtn.innerHTML = "<i class='fa fa-paste' style='margin-left:8px;color:#c5bebe'></i>" + 'جایگذاری';
		DeleteBtn.innerHTML = "<i class='fa fa-delete-right' style='margin-left:8px;color:orange'></i>" + 'حذف پاراگراف';
		if (selected) {
			if (CurrentElementId == selected.id) {
				SelectBtn.innerHTML = "<i class='fa fa-times-circle' style='margin-left:8px;color:red'></i>" + 'لغو انتخاب';
				SelectBtn.addEventListener('click', function () {
					SelectedReseter(CurrentElementId);
					ResetHighLightedElements();
				});
			} else {
				SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:orange'></i>" + 'انتخاب پاراگراف';
				SelectBtn.addEventListener('click', function () {
					Selector(CurrentElementId);
				});
			}
		} else {
			SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:lime'></i>" + 'انتخاب پاراگراف';
			SelectBtn.addEventListener('click', function () {
				Selector(CurrentElementId);
			});
		}
		DeleteBtn.addEventListener('click', function () {
			Deleter(CurrentElementId);
		});
	} else if (action.target.className === 'container-asi-inner') {
		CopyBtn.innerHTML = 'کپی';
		PasteBtn.innerHTML = 'جایگذاری';
		DeleteBtn.innerHTML = 'حذف تصویر';
		if (selected) {
			if (CurrentElementId == selected.id) {
				SelectBtn.innerHTML = 'لغو انتخاب';
				SelectBtn.addEventListener('click', function () {
					SelectedReseter(CurrentElementId);
					ResetHighLightedElements();
				});
			} else {
				SelectBtn.innerHTML = 'انتخاب تصویر';
				SelectBtn.addEventListener('click', function () {
					Selector(CurrentElementId);
				});
			}
		} else {
			SelectBtn.innerHTML = 'انتخاب تصویر';
			SelectBtn.addEventListener('click', function () {
				Selector(CurrentElementId);
			});
		}

		DeleteBtn.addEventListener('click', function () {
			Deleter(CurrentElement.parentNode.id);
		});
		SelectBtn.addEventListener('click', function () {
			Selector(CurrentElement.parentNode.id);
		});
	} else if (action.target.className === 'article-list-container') {
		CopyBtn.innerHTML = "<i class='fa fa-copy' style='margin-left:8px;color:#c5bebe'></i>" + 'کپی';
		PasteBtn.innerHTML = "<i class='fa fa-paste' style='margin-left:8px;color:#c5bebe'></i>" + 'جایگذاری';
		DeleteBtn.innerHTML = "<i class='fa fa-delete-right' style='margin-left:8px;color:orange'></i>" + 'حذف لیست';
		if (selected) {
			if (CurrentElementId == selected.id) {
				SelectBtn.innerHTML = "<i class='fa fa-times-circle' style='margin-left:8px;color:red'></i>" + 'لغو انتخاب';
				SelectBtn.addEventListener('click', function () {
					SelectedReseter(CurrentElementId);
					ResetHighLightedElements();
				});
			} else {
				SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:orange'></i>" + 'انتخاب لیست';
				SelectBtn.addEventListener('click', function () {
					Selector(CurrentElementId);
				});
			}
		} else {
			SelectBtn.innerHTML = "<i class='fa fa-check' style='margin-left:8px;color:lime'></i>" + 'انتخاب لیست';
			SelectBtn.addEventListener('click', function () {
				Selector(CurrentElementId);
			});
		}
		DeleteBtn.addEventListener('click', function () {
			console.log(CurrentElementId);
			Deleter(CurrentElementId);
		});
	}
}
function HideCustomMenu(action) {
	if (action.type == 'click') {
		if (document.getElementById('custom-menu')) {
			document.getElementById('custom-menu').remove();
		}
	} else if (action.type == 'contextmenu') {
		if (action.target.className != 'article-text-input' && action.target.className != 'article-section-title' && action.target.className != 'container-asi-inner' && action.target.className != 'article-list-container') {
			if (document.getElementById('custom-menu')) {
				document.getElementById('custom-menu').remove();
			}
		}
	} else if (action.type == 'scroll') {
		if (document.getElementById('custom-menu')) {
			document.getElementById('custom-menu').remove();
		}
	} else {
		return;
	}
}
function Copy(element) {
	let Element = document.getElementById(element);
	console.log(Element);
	let Start = Element.selectionStart;
	console.log(Start);
	let End = Element.selectionEnd;
	console.log(End);
	let SelectedText = Element.value.substring(Start, End);
	navigator.clipboard.writeText(SelectedText);
}
function Paste(element) {
	let Element = document.getElementById(element);
	let Text = navigator.clipboard.readText();
	let Start = Element.selectionStart;
	let NewText = Element.value.slice(0, Start) + Text + Element.value.slice(Start);
	Element.value = NewText;
}
function ReNewEventListeners() {
	// Dev Note : this is for adding event listeners to elements that are being dynamicilly created both when i create new ones or load them from draft to avoid dirty code.
	// add onlick to delete btns
	{
		let DeleteBtns = Array.from(document.getElementsByClassName('delete-btn'));
		DeleteBtns.forEach((element) => {
			if (element.parentNode.className == 'container-asi') {
				element.onclick = function () {
					Deleter(this.parentNode.closest('.container-asi').id);
				};
			} else if (element.parentNode.className == 'container-ast') {
				element.onclick = function () {
					Deleter(this.parentNode.closest('.article-section').id);
				};
			}
		});
	}
	// add onclick to select btns
	{
		let SelectBtns = Array.from(document.getElementsByClassName('select-btn'));
		SelectBtns.forEach((element) => {
			element.onclick = function () {
				Selector(this.parentNode.closest('.article-section').id);
			};
		});
	}
	// add Custom Menu Events
	{
		let ArticleSections = document.querySelectorAll('.article-text-input');
		ArticleSections.forEach((element) => {
			element.addEventListener('contextmenu', DisplayCustomMenu);
		});
	}
	// add Right Click Event to Paragraphs
	{
		let ArticleSections = document.querySelectorAll('.article-text-input');
		ArticleSections.forEach((element) => {
			element.addEventListener('contextmenu', DisplayCustomMenu);
		});
	}
	// add Right Click Event to Sections(Techincally it is Section Title but anyway)
	{
		let ArticleSectionTitles = document.querySelectorAll('.article-section-title');
		ArticleSectionTitles.forEach((element) => {
			element.addEventListener('contextmenu', DisplayCustomMenu);
		});
	}
	// add Right Click Event to Image containers
	{
		let ArticleSectionImages = document.querySelectorAll('.container-asi-inner');
		ArticleSectionImages.forEach((element) => {
			element.addEventListener('contextmenu', DisplayCustomMenu);
		});
	}
	// add Right Click Event to Lists
	{
		let ArticleListContainers = document.querySelectorAll('.article-list-container');
		ArticleListContainers.forEach((element) => {
			element.addEventListener('contextmenu', DisplayCustomMenu);
		});
	}
	// add ListWatcher event to Lists
	{
		{
			let ArticleListContainers = document.querySelectorAll('.article-list-container');
			ArticleListContainers.forEach((element) => {
				element.addEventListener('keydown', function (action) {
					// console.log(action.target);
					// console.log(action.target.childNodes[0]);
					// console.log(action.target.childNodes[0].getElementsByTagName('li'));
					ListWatcher(action, action.target);
				});
			});
		}
	}
}
window.onload = LoadDraft();
