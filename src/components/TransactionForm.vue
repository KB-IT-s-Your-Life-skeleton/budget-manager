<template>
  <form class="transaction-form">
    <!-- [1] 구분 (type) -->
    <div class="form-row">
      <label>구분</label>
      <select
        :value="modelValue.type"
        @change="
          emit('update:modelValue', {
            ...modelValue,
            type: $event.target.value,
            category: '',
          })
        "
      >
        <!-- ⚠️ type 변경 시 category도 '' 초기화 — categoryOptions preset이 달라지므로 -->
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- [2] 날짜 -->
    <div class="form-row">
      <label>날짜</label>
      <input
        type="date"
        :value="modelValue.date"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            date: $event.target.value,
          })
        "
      />
    </div>

    <!-- [3] 사용처 -->
    <div class="form-row">
      <label>사용처</label>
      <input
        type="text"
        :value="modelValue.place"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            place: $event.target.value,
          })
        "
      />
    </div>

    <!-- [4] 카테고리 — type에 따라 categoryOptions 자동 변경 -->
    <div class="form-row">
      <label>카테고리</label>
      <select
        :value="modelValue.category"
        @change="
          emit('update:modelValue', {
            ...modelValue,
            category: $event.target.value,
          })
        "
      >
        <option value="">선택</option>
        <option v-for="cat in categoryOptions" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- [5] 품목 목록 -->
    <div v-for="(row, index) in modelValue.items" :key="index" class="form-row">
      <input
        type="text"
        :value="row.item"
        placeholder="품목명"
        @input="updateItem(index, 'item', $event.target.value)"
      />
      <input
        type="number"
        :value="row.amount"
        placeholder="가격"
        @input="updateItem(index, 'amount', Number($event.target.value))"
      />
      <button type="button" @click="toggleMemo(index)">메모</button>

      <!-- 메모 영역 — showMemo true일 때만 표시 -->
      <div v-if="row.showMemo">
        <textarea
          :value="row.memo"
          @input="updateItem(index, 'memo', $event.target.value)"
        ></textarea>
        <!-- 저장 버튼: showMemo 닫기만 담당, 실제 저장은 폼 전체 저장 시 -->
        <button type="button" @click="closeMemo(index)">저장</button>
      </div>
    </div>

    <!-- [+] 품목 행 추가 -->
    <button type="button" @click="addItem">+</button>

    <div class="button-row">
      <button type="button" @click="emit('cancel')">취소</button>
      <button type="button" @click="emit('submit')">저장</button>
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue';

// [T-1] props — CODING_RULES: type + required 필수 명시
const props = defineProps({
  modelValue: { type: Object, required: true },
});

// [T-2] emits
const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

// [T-3] categoryOptions — type이 바뀌면 자동으로 옵션 목록 변경
const categoryOptions = computed(() =>
  props.modelValue.type === 'income'
    ? ['월급', '용돈', '이자']
    : ['식비', '교통비', '유흥', '공과금'],
);

// [T-6] 특정 품목 행 필드 업데이트
// field: 'item' | 'amount' | 'memo'
const updateItem = (index, field, value) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, [field]: value } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// [T-6] 빈 품목 행 추가
const addItem = () => {
  const newItems = [
    ...props.modelValue.items,
    { item: '', amount: 0, memo: '', showMemo: false },
  ];
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// [T-6] 메모 영역 토글 (메모 버튼 클릭 시)
const toggleMemo = (index) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, showMemo: !row.showMemo } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// [T-6] 메모 영역 닫기 (저장 버튼 클릭 시)
const closeMemo = (index) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, showMemo: false } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};
</script>

<style scoped>
.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
