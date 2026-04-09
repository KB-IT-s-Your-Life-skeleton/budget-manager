<template>
  <div>
    <h2>대시보드</h2>

    <section class="summary-cards">
      <div class="card">
        <p>이번 달 총 수입</p>
        <span class="income">+ {{ totalIncome.toLocaleString() }}원</span>
      </div>
      <div class="card">
        <p>이번 달 총 지출</p>
        <span class="expense">- {{ totalExpense.toLocaleString() }}원</span>
      </div>
      <div class="card">
        <p>남은 예산 (순수익)</p>
        <span class="balance"
          >{{ (totalIncome - totalExpense).toLocaleString() }}원</span
        >
      </div>
    </section>

    <div class="chart-area"></div>

    <div class="recent-transactions"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 1. 상태 데이터 정의
const transactions = ref([]); // 서버에서 가져온 전체 거래 내역을 담는 바구니
const currentMonth = ref(new Date().getMonth() + 1); // 현재 컴퓨터 날짜 기준으로 '월' 설정

/**
 * [기능] 서버에서 데이터 가져오기
 * 함수명을 fetchTransactions로 설정
 */
const fetchTransactions = async () => {
  try {
    // 가이드의 json-server 주소인 /budget 엔드포인트에서 데이터를 가져옵니다.
    const response = await axios.get('http://localhost:3000/budget');
    transactions.value = response.data;
  } catch (error) {
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
};

/**
 * [로직 1] 현재 달에 해당하는 내역만 필터링
 * 전체 내역 중 날짜가 현재 달(currentMonth)과 일치하는 것만 골라냅니다.
 */
const filteredTransactions = computed(() => {
  return transactions.value.filter((item) => {
    const itemMonth = new Date(item.date).getMonth() + 1;
    return itemMonth === currentMonth.value;
  });
});

/**
 * [로직 2] 총 수입 계산
 * 필터링된 내역 중 type이 'income'인 것들만 합산합니다.
 * TODO: filter와 reduce를 사용해서 합계를 계산하세요. 기본 JavaScript 메서드만 사용.
 */
const totalIncome = computed(() => {
  // TODO: transactions.value.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  return filteredTransactions.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
});

/**
 * [로직 3] 총 지출 계산
 * 필터링된 내역 중 type이 'expense'인 것들만 합산합니다.
 * TODO: filter와 reduce를 사용해서 합계를 계산하세요. 기본 JavaScript 메서드만 사용.
 */
const totalExpense = computed(() => {
  // TODO: transactions.value.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  return filteredTransactions.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
});

// 페이지가 열리면 자동으로 데이터를 불러오는 함수를 실행합니다.
onMounted(() => {
  fetchTransactions();
});
</script>
