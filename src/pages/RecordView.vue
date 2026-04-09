<template>
  <div>
    <h2>거래 등록</h2>

    <!-- ✅ [1-2] 완료 -->

    <TransactionForm
      :modelValue="FormData"
      @update:modelValue="(val) => Object.assign(FormData, val)"
      @submit="handleSubmit"
      @cancel="resetForm"
    />
  </div>
</template>

<script setup>
// ✅ [1-1] import 완료
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transaction';
import TransactionForm from '@/components/TransactionForm.vue';

// ✅ [1-1] store, router 초기화 완료
const store = useTransactionStore();
const router = useRouter();

// ✅ [1-1] 폼 상태 정의 완료
// showMemo: UI 토글 전용값 — API 전송 객체에 포함하지 않는다
const FormData = reactive({
  type: 'expense',
  date: '',
  place: '',
  category: '',
  items: [{ item: '', amount: 0, memo: '', showMemo: false }],
});

// [1-3] 폼 유효성 검사
const validateForm = () => {
  if (!FormData.date)     { alert('날짜를 입력해주세요'); return false }
  if (!FormData.place)    { alert('사용처를 입력해주세요'); return false }
  if (!FormData.category) { alert('카테고리를 선택해주세요'); return false }
  for (const row of FormData.items) {
    if (!row.item)       { alert('품목명을 입력해주세요'); return false }
    if (row.amount <= 0) { alert('가격을 입력해주세요'); return false }
  }
  return true
}

// [1-5] 폼 초기화 (저장 성공 또는 취소 시 호출)
const resetForm = () => {
  Object.assign(FormData, {
    type: 'expense',
    date: '',
    place: '',
    category: '',
    items: [{ item: '', amount: 0, memo: '', showMemo: false }],
  })
}

// [1-4] 저장 처리 — 품목별 단건 분리 전송
// ⚠️ showMemo는 UI 전용값 — API 전송 객체에 포함하지 않는다
const handleSubmit = async () => {
  if (!validateForm()) return

  for (const row of FormData.items) {
    await store.CreateTransaction({
      date: FormData.date,
      type: FormData.type,
      place: FormData.place,
      category: FormData.category,
      item: row.item,
      amount: row.amount,
      memo: row.memo,
    })
  }

  resetForm()
  router.push({ name: 'TransactionListView' }) // [1-6] named route
}
</script>
