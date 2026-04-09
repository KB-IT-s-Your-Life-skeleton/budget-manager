<template>
  <form class="TransactionForm">

    <!-- [1] 구분 (type) - 첫 번째 필드, income/expense 선택 -->
    <!--
      TODO: [T-3] type select 바인딩
      :value="modelValue.type"
      @change="emit('update:modelValue', { ...modelValue, type: $event.target.value, category: '' })"
      ⚠️ type 변경 시 category도 같이 '' 초기화 (preset이 바뀌기 때문)
    -->
    <div class="FormRow">
      <label>구분</label>
      <select>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- [2] 날짜 - 달력 -->
    <!--
      TODO: [T-3] date input 바인딩
      :value="modelValue.date"
      @input="emit('update:modelValue', { ...modelValue, date: $event.target.value })"
    -->
    <div class="FormRow">
      <label>날짜</label>
      <input type="date" />
    </div>

    <!-- [3] 사용처 - 텍스트 -->
    <!--
      TODO: [T-3] place input 바인딩
      :value="modelValue.place"
      @input="emit('update:modelValue', { ...modelValue, place: $event.target.value })"
    -->
    <div class="FormRow">
      <label>사용처</label>
      <input type="text" />
    </div>

    <!-- [4] 카테고리 - 드롭다운 (type에 따라 preset 변경) -->
    <!--
      TODO: [T-3] category 드롭다운 바인딩
      script에서 computed로 CategoryOptions 정의:
        income  → ['월급', '용돈', '이자']
        expense → ['식비', '교통비', '유흥', '공과금']

      :value="modelValue.category"
      @change="emit('update:modelValue', { ...modelValue, category: $event.target.value })"

      옵션 렌더링:
      <option value="">선택</option>
      <option v-for="cat in CategoryOptions" :key="cat" :value="cat">{{ cat }}</option>
    -->
    <div class="FormRow">
      <label>카테고리</label>
      <select>
        <option value="">선택</option>
      </select>
    </div>

    <!-- [5] 품목 목록 - v-for 반복 렌더링 -->
    <!--
      TODO: [T-6] items 배열 반복
      각 행: 품목명 + 가격 + [메모] 버튼
      메모 버튼 클릭 → showMemo 토글 → textarea + [저장] 버튼 표시
      저장 버튼 클릭 → showMemo = false (닫힘)

      <div v-for="(row, index) in modelValue.items" :key="index">
        <input type="text"   :value="row.item"   @input="updateItem(index, 'item', $event.target.value)" />
        <input type="number" :value="row.amount" @input="updateItem(index, 'amount', Number($event.target.value))" />
        <button type="button" @click="toggleMemo(index)">메모</button>

        <div v-if="row.showMemo">
          <textarea :value="row.memo" @input="updateItem(index, 'memo', $event.target.value)"></textarea>
          <button type="button" @click="closeMemo(index)">저장</button>
        </div>
      </div>
    -->
    <div class="FormRow">
      <label>품목명</label>
      <label>가격</label>
    </div>

    <!-- [+] 품목 추가 버튼 -->
    <!--
      TODO: [T-6] + 버튼 클릭 → 빈 행 추가
      @click="addItem"
    -->
    <button type="button">+</button>

    <div class="ButtonRow">
      <!-- TODO: [T-5] 취소 버튼 @click="emit('cancel')" -->
      <button type="button">취소</button>

      <!-- TODO: [T-4] 저장 버튼 @click="emit('submit')" -->
      <button type="button">저장</button>
    </div>
  </form>
</template>

<script setup>
// import { computed } from 'vue'  // TODO: [T-3] CategoryOptions 구현 시 주석 해제

// [T-1] props - 부모(RecordView)의 FormData 객체를 통째로 받음
const props = defineProps({
  modelValue: Object,
})

// [T-2] emits
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

// TODO: [T-3] CategoryOptions computed
// type이 바뀌면 자동으로 옵션 목록이 바뀜
// const CategoryOptions = computed(() => {
//   return props.modelValue.type === 'income'
//     ? ['월급', '용돈', '이자']
//     : ['식비', '교통비', '유흥', '공과금']
// })

// TODO: [T-6] 특정 품목 행의 필드 값 변경
// const updateItem = (index, field, value) => {
//   const newItems = props.modelValue.items.map((row, i) =>
//     i === index ? { ...row, [field]: value } : row
//   )
//   emit('update:modelValue', { ...props.modelValue, items: newItems })
// }

// TODO: [T-6] 품목 행 추가
// const addItem = () => {
//   const newItems = [...props.modelValue.items, { item: '', amount: 0, memo: '', showMemo: false }]
//   emit('update:modelValue', { ...props.modelValue, items: newItems })
// }

// TODO: [T-6] 메모 토글 (showMemo 반전)
// const toggleMemo = (index) => {
//   const newItems = props.modelValue.items.map((row, i) =>
//     i === index ? { ...row, showMemo: !row.showMemo } : row
//   )
//   emit('update:modelValue', { ...props.modelValue, items: newItems })
// }

// TODO: [T-6] 메모 저장(닫기) - 저장 버튼 클릭 시
// const closeMemo = (index) => {
//   const newItems = props.modelValue.items.map((row, i) =>
//     i === index ? { ...row, showMemo: false } : row
//   )
//   emit('update:modelValue', { ...props.modelValue, items: newItems })
// }
</script>

<style scoped>
.TransactionForm {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
}

.FormRow {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ButtonRow {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
