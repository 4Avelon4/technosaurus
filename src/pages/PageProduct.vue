<template>
  <LoadingInfo
    class="content container"
    v-if="this.$store.state.product.productsLoading || !productsData"
    :condition-loading="this.$store.state.product.productsLoading"
    :condition-loading-failed="!productsData"
    :condition-reset="loadProduct"
    title-loading="Загрузка товара..."
    title-failed="Не удалось загрузить товар"
  />
  <main class="content container" v-else-if="!this.$store.state.product.productsLoadingFailed">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" @click.prevent="goToPageCategory">{{ category.title }} </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title" />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" />
                    <span class="colors__value" :style="{ backgroundColor: color.code }"> </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32" />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64" />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="" />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <CartCounter :amount.sync="amount" />

              <button
                class="button button--primery"
                type="submit"
                :disabled="this.$store.state.product.productAddSending"
              >
                В корзину
              </button>

              <ProductPreloader class="preloader__product" v-show="this.$store.state.product.productAddSending" />
            </div>

            <div class="item__info-addition">
              <div class="item__info--adding" v-show="this.$store.state.productAdded">Товар добавлен в корзину</div>
              <div class="item__info--sending" v-show="this.$store.state.product.productAddSending">
                Добавляем товар в корзину...
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их
            максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с
            них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация
            позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к
            пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а
            также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения
            педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от
            влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
            погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions, mapMutations } from 'vuex';
import CartCounter from '@/components/CartCounter.vue';
import ProductPreloader from '@/components/ProductPreloader.vue';
import LoadingInfo from '@/components/LoadingInfo.vue';

export default {
  components: { CartCounter, ProductPreloader, LoadingInfo },
  data() {
    return {
      amount: +this.$route.query.amount || 1,
      productsData: null,
      currentCategoryId: 0,
    };
  },
  props: ['categoryId'],
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      const product = this.productsData;

      return {
        ...product,
        image: product.image.file.url,
      };
    },
    category() {
      return this.productsData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    ...mapMutations([
      'productLoadingChecking',
      'productLoadingFailedChecking',
      'productAddedChecking',
      'productAddSendingChecking',
    ]),

    goToPage,
    addToCart() {
      this.productAddedChecking(false);
      this.productAddSendingChecking(true);

      this.loadProductsTimer = setTimeout(() => {
        this.addProductToCart({ productId: this.product.id, amount: this.amount }).then(() => {
          this.productAddedChecking(true);
          this.productAddSendingChecking(false);
        });
      }, 0);
    },
    loadProduct() {
      this.productLoadingChecking(true);
      this.productLoadingFailedChecking(false);

      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => (this.productsData = response.data))
          .catch(() => {
            this.productLoadingFailedChecking(true);
          })
          .then(() => {
            this.productLoadingChecking(false);
          });
      }, 0);
    },
    goToPageCategory() {
      this.$router.push({
        name: 'main',
        query: {
          categoryId: this.category.id,
        },
      });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
  created() {
    this.productAddedChecking(false);
  },
};
</script>

<style>
.content {
  min-height: 100vh;
}

.form__btn {
  cursor: pointer;
}

.item__row {
  position: relative;
}

.preloader__product {
  position: absolute;
  top: 10px;
  left: 88%;
}

.preloader__product.loader::before {
  border: 5px solid #9eff00;
}

.item__info-addition {
  position: relative;
}

.item__info--adding,
.item__info--sending {
  position: absolute;
  left: 0;
  top: 10px;
}
</style>
