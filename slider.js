class Slider {
    constructor(options) {
        const { images, containerSelector } = options,
            containerElement = document.querySelector(containerSelector);

        this._images = images;
        this._activeSlideIndex = 0;

        if (containerElement) {
            const {
                sliderContainer,
                imgContainer
            } = this.createContainer();

            this._sliderContainer = sliderContainer;
            this._imgContainer = imgContainer;

            containerElement.append(this._sliderContainer);
        }
    }

    nextSlide() {
        this._activeSlideIndex = (this._activeSlideIndex + 1) % this._images.length;
        this.render();
    }

    prevSlide() {
        this._activeSlideIndex = (this._images.length + this._activeSlideIndex - 1) % this._images.length;
        this.render();
    }

    getActiveSlideIndex() {
        return this._activeSlideIndex;
    }

    getActiveImageSrc() {
        const {
            _activeSlideIndex, _images
        } = this;

        return _images[_activeSlideIndex];
    }

    createContainer() {
        const sliderContainer = document.createElement('div'),
            imgHolder = document.createElement('div'),
            imgContainer = document.createElement('img'),
            sliderControls = document.createElement('div'),
            nextSlide = document.createElement('button'),
            prevSlide = document.createElement('button');

        imgHolder.append(imgContainer);
        sliderContainer.append(imgHolder, sliderControls);
        sliderControls.append(nextSlide, prevSlide);

        imgHolder.classList.add('slider__image-wrapper');
        sliderContainer.classList.add('slider');
        imgContainer.classList.add('slider__image');
        imgContainer.src = this.getActiveImageSrc();
        imgContainer.alt = '';
        sliderControls.classList.add('slider__controls');
        nextSlide.classList.add('slider__next-slide');
        nextSlide.classList.add('slider__control');
        nextSlide.innerText = 'Prev';
        prevSlide.classList.add('slider__prev-slide');
        prevSlide.classList.add('slider__control');
        prevSlide.innerText = 'Next';

        nextSlide.addEventListener('click', this.nextSlide.bind(this));
        prevSlide.addEventListener('click', this.prevSlide.bind(this));

        return {
            sliderContainer,
            imgContainer
        };
    }

    render() {
        this._imgContainer.src = this.getActiveImageSrc()
    }
}

class Slider2 extends Slider {
    createImageItem(imageSrc, idx) {
        const imgContainer = document.createElement('img'),
            itemContainer = document.createElement('li'),
            activeSlideIndex = this.getActiveSlideIndex();

        itemContainer.append(imgContainer);

        itemContainer.classList.add('slider__image-wrapper');
        itemContainer.classList.add('slider__slide');

        if (activeSlideIndex === idx) {
            itemContainer.classList.add('slider__slide-active');
        }

        imgContainer.classList.add('slider__image');
        imgContainer.src = imageSrc;
        imgContainer.alt = '';

        return itemContainer;
    }

    createContainer() {
        const sliderContainer = document.createElement('div'),
            imgHolder = document.createElement('ul'),
            sliderControls = document.createElement('div'),
            nextSlide = document.createElement('button'),
            prevSlide = document.createElement('button'),
            { _images } = this,
            slides = _images.map(this.createImageItem.bind(this));

        this._slides = slides;

        imgHolder.append(...slides);
        sliderContainer.append(imgHolder, sliderControls);
        sliderControls.append(nextSlide, prevSlide);

        imgHolder.classList.add('slider__image-wrapper');
        imgHolder.classList.add('slider__image-list-wrapper');
        sliderContainer.classList.add('slider');
        sliderControls.classList.add('slider__controls');
        nextSlide.classList.add('slider__next-slide');
        nextSlide.classList.add('slider__control');
        nextSlide.innerText = 'Prev';
        prevSlide.classList.add('slider__prev-slide');
        prevSlide.classList.add('slider__control');
        prevSlide.innerText = 'Next';

        nextSlide.addEventListener('click', this.nextSlide.bind(this));
        prevSlide.addEventListener('click', this.prevSlide.bind(this));

        return {
            sliderContainer,
            imgContainer: {}
        };
    }

    render() {
        const activeSlideIndex = this.getActiveSlideIndex();

        this._slides.forEach(function (slide, idx) {
            slide.classList.remove('slider__slide-active');

            if (activeSlideIndex === idx) {
                slide.classList.add('slider__slide-active');
            }
        });
    }
}

class Slider3 extends Slider2 {
    constructor(options) {
        super(options);

        this._sliderContainer.classList.add('slider--shift')
    }

    createImageItem(imageSrc, idx) {
        const imgContainer = document.createElement('img'),
            itemContainer = document.createElement('li'),
            activeSlideIndex = this.getActiveSlideIndex();

        itemContainer.append(imgContainer);

        itemContainer.classList.add('slider__image-wrapper');
        itemContainer.classList.add('slider__slide--shift');
        itemContainer.classList.add('slider__slide');

        imgContainer.classList.add('slider__image');
        imgContainer.src = imageSrc;
        imgContainer.alt = '';

        return itemContainer;
    }

    createContainer() {
        const sliderContainer = document.createElement('div'),
            imgWrapper = document.createElement('div'),
            imgHolder = document.createElement('ul'),
            sliderControls = document.createElement('div'),
            nextSlide = document.createElement('button'),
            prevSlide = document.createElement('button'),
            { _images } = this,
            slides = _images.map(this.createImageItem.bind(this));

        this._imgHolder = imgHolder;

        imgHolder.append(...slides);
        imgWrapper.append(imgHolder);
        sliderContainer.append(imgWrapper, sliderControls);
        sliderControls.append(nextSlide, prevSlide);

        imgWrapper.classList.add('slider__roller')
        imgHolder.classList.add('slider__image-wrapper');
        imgHolder.classList.add('slider__image-list-wrapper');
        sliderContainer.classList.add('slider');
        sliderControls.classList.add('slider__controls');
        nextSlide.classList.add('slider__next-slide');
        nextSlide.classList.add('slider__control');
        nextSlide.innerText = 'Next';
        prevSlide.classList.add('slider__prev-slide');
        prevSlide.classList.add('slider__control');
        prevSlide.innerText = 'Prev';

        nextSlide.addEventListener('click', this.nextSlide.bind(this));
        prevSlide.addEventListener('click', this.prevSlide.bind(this));

        return {
            sliderContainer,
            imgContainer: {}
        };
    }

    render() {
        const activeSlideIndex = this.getActiveSlideIndex();

        this._imgHolder.style.transform = `translateX(-${activeSlideIndex * 100}%)`
    }
}

console.clear

const slider = new Slider3({
    images: [
        'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
        'https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg',
        'https://icocnews.ru/wp-content/uploads/2015/09/priroda.jpg',
        'https://www.crimeantatars.club/wp-content/uploads/2016/04/Priroda.jpg'
    ],
    containerSelector: '.content'
}),
    slider1 = new Slider2({
        images: [
            'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
            'https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg',
            'https://icocnews.ru/wp-content/uploads/2015/09/priroda.jpg',
            'https://www.crimeantatars.club/wp-content/uploads/2016/04/Priroda.jpg'
        ],
        containerSelector: '.content'
    });
