<template>
  <div>
    <h2>거래 등록</h2>

    <!--
      TODO: [1-2] TransactionForm 컴포넌트 연결
      - import한 TransactionForm을 여기에 배치
      - :modelValue="FormData" 로 데이터 내려주기
      - @update:modelValue 로 변경값 받기
      - @submit="handleSubmit" 연결
      - @cancel="resetForm" 연결

      예시:
      <TransactionForm
        :modelValue="FormData"
        @update:modelValue="(val) => Object.assign(FormData, val)"
        @submit="handleSubmit"
        @cancel="resetForm"
      />
    -->
  </div>
</template>

<script setup>
// TODO: [1-1] 필요한 모듈 import
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import TransactionForm from '@/components/TransactionForm.vue'

// TODO: [1-1] store, router 초기화
// const store = useTransactionStore()
// const router = useRouter()

// TODO: [1-1] 폼 상태 정의
// - type: 'expense' 기본값 (폼 상단 첫 번째, category preset에 영향)
// - place: 사용처 텍스트
// - items: 품목 배열 — 기본 1개, + 버튼으로 추가 가능
//   - showMemo: UI 토글 상태값 (API 전송 시 제외)
// const FormData = reactive({
//   type: 'expense',
//   date: '',
//   place: '',
//   category: '',
//   items: [{ item: '', amount: 0, memo: '', showMemo: false }]
// })

// TODO: [1-3] 폼 유효성 검사
// 검사 항목:
//   1. date 비어있는지
//   2. place 비어있는지
//   3. category 비어있는지
//   4. items 중 item명 비거나 amount 0 이하인 행 있는지
// 통과 시 true, 실패 시 alert 후 false 반환
// const validateForm = () => {
//
// }

// TODO: [1-5] 폼 초기화 (저장 성공 또는 취소 시 호출)
// items도 반드시 초기 1개 행으로 복원할 것
// const resetForm = () => {
//   Object.assign(FormData, {
//     type: 'expense',
//     date: '',
//     place: '',
//     category: '',
//     items: [{ item: '', amount: 0, memo: '', showMemo: false }]
//   })
// }

// TODO: [1-4] 저장 처리 함수 — 단건 분리 전송
// 품목이 N개면 store.CreateTransaction을 N번 호출한다
// ⚠️ showMemo는 UI 상태값이므로 API에 포함하지 않는다
// 순서:
//   1) validateForm() → 실패 시 return
//   2) for...of 로 FormData.items 순회
//   3) 각 품목마다 await store.CreateTransaction({ date, type, place, category, item, amount, memo })
//   4) 완료 후 resetForm()
//   5) router.push('/transactions')  ← [1-6]
// const handleSubmit = async () => {
//   if (!validateForm()) return
//
//   for (const Row of FormData.items) {
//     await store.CreateTransaction({
//       date: FormData.date,
//       type: FormData.type,
//       place: FormData.place,
//       category: FormData.category,
//       item: Row.item,
//       amount: Row.amount,
//       memo: Row.memo       // 선택값, 빈 문자열도 허용
//     })
//   }
//
//   resetForm()
//   router.push('/transactions')
// }
</script>
